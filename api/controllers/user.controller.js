import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

export const test = (req, res) => {
  res.json({ message: 'API is working!' });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, 'Username must be between 7 and 20 characters')
      );
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain spaces'));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, 'Username can only contain letters and numbers')
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// update user role to admin or user by admin (admin only)
export const updateUserRole = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    user.isAdmin = !user.isAdmin;
    await user.save({ validateModifiedOnly: true });
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// Bookmark/Unbookmark post
export const toggleBookmark = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    const postId = req.params.postId;
    const bookmarkIndex = user.bookmarks.indexOf(postId);

    if (bookmarkIndex === -1) {
      // Add bookmark
      user.bookmarks.push(postId);
    } else {
      // Remove bookmark
      user.bookmarks.splice(bookmarkIndex, 1);
    }

    await user.save();
    const { password, ...rest } = user._doc;
    res.status(200).json({
      bookmarks: rest.bookmarks,
      bookmarked: bookmarkIndex === -1,
    });
  } catch (error) {
    next(error);
  }
};

// Get user's bookmarked posts
export const getBookmarkedPosts = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('bookmarks');
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    res.status(200).json(user.bookmarks);
  } catch (error) {
    next(error);
  }
};

// Get author profile with stats
export const getAuthorProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    const { password, ...userWithoutPassword } = user._doc;

    // Get author's post count
    const Post = (await import('../models/post.model.js')).default;
    const totalPosts = await Post.countDocuments({ 
      userId: req.params.userId,
      status: 'published'
    });

    // Get total views on author's posts
    const posts = await Post.find({ 
      userId: req.params.userId,
      status: 'published'
    });
    const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
    const totalLikes = posts.reduce((sum, post) => sum + (post.likes?.length || 0), 0);

    res.status(200).json({
      ...userWithoutPassword,
      stats: {
        totalPosts,
        totalViews,
        totalLikes,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Follow/Unfollow user
export const toggleFollow = async (req, res, next) => {
  try {
    if (req.user.id === req.params.userId) {
      return next(errorHandler(400, 'You cannot follow yourself'));
    }

    const userToFollow = await User.findById(req.params.userId);
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow) {
      return next(errorHandler(404, 'User not found'));
    }

    const isFollowing = currentUser.following.includes(req.params.userId);

    if (isFollowing) {
      // Unfollow
      currentUser.following = currentUser.following.filter(
        (id) => id !== req.params.userId
      );
      userToFollow.followers = userToFollow.followers.filter(
        (id) => id !== req.user.id
      );
    } else {
      // Follow
      currentUser.following.push(req.params.userId);
      userToFollow.followers.push(req.user.id);
    }

    await currentUser.save();
    await userToFollow.save();

    res.status(200).json({
      following: currentUser.following,
      isFollowing: !isFollowing,
    });
  } catch (error) {
    next(error);
  }
};

// Get user's followers
export const getFollowers = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      'followers',
      'username profilePicture'
    );
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    res.status(200).json(user.followers);
  } catch (error) {
    next(error);
  }
};

// Get user's following
export const getFollowing = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      'following',
      'username profilePicture'
    );
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    res.status(200).json(user.following);
  } catch (error) {
    next(error);
  }
};
