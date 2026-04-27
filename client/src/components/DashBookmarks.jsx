import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiBookmark, HiClock, HiEye, HiHeart } from 'react-icons/hi';
import LoadingSkeleton from './LoadingSkeleton';

export default function DashBookmarks() {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/user/bookmarks/posts');
      const data = await res.json();

      if (res.ok) {
        setBookmarkedPosts(data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <LoadingSkeleton type="post" />
        <LoadingSkeleton type="post" />
        <LoadingSkeleton type="post" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="glass-card rounded-2xl p-8 text-center">
          <p className="text-red-500 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (bookmarkedPosts.length === 0) {
    return (
      <div className="p-6">
        <div className="glass-card rounded-2xl p-12 text-center">
          <HiBookmark className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            No Bookmarks Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start bookmarking posts to save them for later reading
          </p>
          <Link
            to="/search"
            className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            Browse Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Bookmarked Posts
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {bookmarkedPosts.length} {bookmarkedPosts.length === 1 ? 'post' : 'posts'} saved
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarkedPosts.map((post) => (
          <Link
            key={post._id}
            to={`/post/${post.slug}`}
            className="glass-card rounded-2xl overflow-hidden group hover:shadow-lg transition-all"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/90 text-white backdrop-blur-sm flex items-center gap-1">
                  <HiBookmark className="w-3 h-3" />
                  Saved
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-600 flex items-center gap-1">
                  <HiClock className="w-3 h-3" />
                  {Math.ceil(post.content.length / 1000)} min
                </span>
              </div>

              <h3 className="text-lg font-semibold tracking-tight mb-2 line-clamp-2 text-gray-900 dark:text-white">
                {post.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 mb-4">
                {post.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-600">
                <span className="flex items-center gap-1">
                  <HiEye className="w-4 h-4" />
                  {post.views || 0}
                </span>
                <span className="flex items-center gap-1">
                  <HiHeart className="w-4 h-4" />
                  {post.likes?.length || 0}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
