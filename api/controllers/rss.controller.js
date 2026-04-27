import Post from '../models/post.model.js';
import User from '../models/user.model.js';

export const generateRSSFeed = async (req, res, next) => {
  try {
    const posts = await Post.find({ status: 'published' })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('userId', 'username');

    const siteUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const currentDate = new Date().toUTCString();

    let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog - Latest Articles</title>
    <link>${siteUrl}</link>
    <description>Latest articles and tutorials on web development</description>
    <language>en-us</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml" />
`;

    posts.forEach((post) => {
      const postUrl = `${siteUrl}/post/${post.slug}`;
      const pubDate = new Date(post.createdAt).toUTCString();
      const author = post.userId?.username || 'Anonymous';
      
      // Strip HTML tags from content for description
      const description = post.content
        .replace(/<[^>]*>/g, '')
        .substring(0, 200) + '...';

      rss += `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${author}</author>
      <category>${post.category}</category>
      <description><![CDATA[${description}]]></description>
    </item>`;
    });

    rss += `
  </channel>
</rss>`;

    res.set('Content-Type', 'application/rss+xml');
    res.send(rss);
  } catch (error) {
    next(error);
  }
};
