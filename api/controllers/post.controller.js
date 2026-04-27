import Post from '../models/post.model.js';
import View from '../models/view.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    
    // Handle different sort options
    let sortOption = { updatedAt: -1 }; // default
    if (req.query.order === 'asc') {
      sortOption = { updatedAt: 1 };
    } else if (req.query.sort === 'views') {
      sortOption = { views: -1 };
    } else if (req.query.sort === 'likes') {
      sortOption = { likes: -1 };
    }
    
    const query = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.tag && { tags: req.query.tag }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    };

    // Filter by author username
    if (req.query.author) {
      const User = (await import('../models/user.model.js')).default;
      const author = await User.findOne({ username: req.query.author });
      if (author) {
        query.userId = author._id.toString();
      } else {
        return res.status(200).json({ posts: [], totalPosts: 0, lastMonthPosts: 0 });
      }
    }

    // Filter by date range
    if (req.query.startDate || req.query.endDate) {
      query.createdAt = {};
      if (req.query.startDate) {
        query.createdAt.$gte = new Date(req.query.startDate);
      }
      if (req.query.endDate) {
        const endDate = new Date(req.query.endDate);
        endDate.setHours(23, 59, 59, 999);
        query.createdAt.$lte = endDate;
      }
    }

    if (!req.query.userId) {
      query.status = 'published';
    }

    const posts = await Post.find(query)
      .sort(sortOption)
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments(query);

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
      status: 'published',
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const deletepost = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this post'));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
};

export const updatepost = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this post'));
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
          status: req.body.status,
          metaDescription: req.body.metaDescription,
          metaKeywords: req.body.metaKeywords,
          tags: req.body.tags,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

export const likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(errorHandler(404, 'Post not found'));
    }

    const userIndex = post.likes.indexOf(req.user.id);
    
    if (userIndex === -1) {
      post.likes.push(req.user.id);
    } else {
      post.likes.splice(userIndex, 1);
    }

    await post.save();
    res.status(200).json({
      likes: post.likes,
      likesCount: post.likes.length,
    });
  } catch (error) {
    next(error);
  }
};

export const incrementViews = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    
    // Get IP address (handle various proxy scenarios)
    const ipAddress = 
      req.headers['x-forwarded-for']?.split(',')[0] || 
      req.headers['x-real-ip'] || 
      req.connection.remoteAddress || 
      req.socket.remoteAddress || 
      'unknown';
    
    // Get user agent
    const userAgent = req.headers['user-agent'] || '';
    
    // Check if this IP has already viewed this post in the last 7 days
    const existingView = await View.findOne({ 
      postId, 
      ipAddress 
    });
    
    if (!existingView) {
      // Create new view record (will auto-expire after 24 hours)
      try {
        await View.create({ 
          postId, 
          ipAddress,
          userAgent 
        });
        
        // Increment the post view count
        const post = await Post.findByIdAndUpdate(
          postId,
          { $inc: { views: 1 } },
          { new: true }
        );
        
        if (!post) {
          return next(errorHandler(404, 'Post not found'));
        }
        
        return res.status(200).json({ 
          views: post.views,
          counted: true,
          message: 'View counted'
        });
      } catch (error) {
        // Handle duplicate key error (race condition)
        if (error.code === 11000) {
          const post = await Post.findById(postId);
          return res.status(200).json({ 
            views: post.views,
            counted: false,
            message: 'Already viewed'
          });
        }
        throw error;
      }
    } else {
      // View already exists, just return current count
      const post = await Post.findById(postId);
      
      if (!post) {
        return next(errorHandler(404, 'Post not found'));
      }
      
      return res.status(200).json({ 
        views: post.views,
        counted: false,
        message: 'Already viewed in last 7 days'
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getRelatedPosts = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(errorHandler(404, 'Post not found'));
    }

    const relatedPosts = await Post.find({
      category: post.category,
      _id: { $ne: post._id },
      status: 'published',
    })
      .limit(3)
      .sort({ createdAt: -1 });

    res.status(200).json(relatedPosts);
  } catch (error) {
    next(error);
  }
};

// Get popular tags
export const getPopularTags = async (req, res, next) => {
  try {
    const tags = await Post.aggregate([
      { $match: { status: 'published' } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 },
    ]);

    res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};
