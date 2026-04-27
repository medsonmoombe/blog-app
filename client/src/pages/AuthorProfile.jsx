import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiDocumentText, HiEye, HiHeart, HiCalendar, HiUserGroup } from 'react-icons/hi';
import LoadingSkeleton from '../components/LoadingSkeleton';
import FollowButton from '../components/FollowButton';

export default function AuthorProfile() {
  const { userId } = useParams();
  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAuthorData();
  }, [userId]);

  const fetchAuthorData = async () => {
    try {
      setLoading(true);
      
      // Fetch author profile
      const authorRes = await fetch(`/api/user/author/${userId}`);
      const authorData = await authorRes.json();
      
      if (!authorRes.ok) {
        setError(authorData.message);
        setLoading(false);
        return;
      }
      
      setAuthor(authorData);

      // Fetch author's posts
      const postsRes = await fetch(`/api/post/getposts?userId=${userId}`);
      const postsData = await postsRes.json();
      
      if (postsRes.ok) {
        setPosts(postsData.posts);
      }
      
      setLoading(false);
    } catch (error) {
      setError('Failed to load author profile');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <LoadingSkeleton type="profile" />
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LoadingSkeleton type="post" />
            <LoadingSkeleton type="post" />
            <LoadingSkeleton type="post" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="glass-card rounded-2xl p-8 text-center">
          <p className="text-red-500 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-inter min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
      <div className="glow-orb-1" style={{ top: '-300px', right: '-200px' }} />
      <div className="glow-orb-2" style={{ bottom: '-200px', left: '-150px' }} />

      <main className="relative z-10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Author Header */}
          <div className="glass-card rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <img
                src={author?.profilePicture}
                alt={author?.username}
                className="w-32 h-32 rounded-2xl object-cover border-4 border-white dark:border-gray-800 shadow-lg"
              />

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                      {author?.username}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      {author?.email}
                    </p>
                  </div>
                  <FollowButton userId={userId} />
                </div>
                
                {author?.isAdmin && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary-light border border-primary/20 mb-4">
                    Admin
                  </span>
                )}

                {/* Stats */}
                <div className="flex flex-wrap gap-6 justify-center md:justify-start mt-6">
                  <div className="text-center">
                    <div className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
                      <HiDocumentText className="w-6 h-6 text-primary-light" />
                      {author?.stats?.totalPosts || 0}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Posts</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
                      <HiUserGroup className="w-6 h-6 text-orange-500" />
                      {author?.followers?.length || 0}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
                      <HiUserGroup className="w-6 h-6 text-cyan-500" />
                      {author?.following?.length || 0}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
                      <HiEye className="w-6 h-6 text-blue-500" />
                      {author?.stats?.totalViews || 0}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Views</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
                      <HiHeart className="w-6 h-6 text-red-500" />
                      {author?.stats?.totalLikes || 0}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Likes</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
                      <HiCalendar className="w-6 h-6 text-green-500" />
                      {new Date(author?.createdAt).getFullYear()}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Joined</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Posts by {author?.username}
            </h2>

            {posts.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center">
                <HiDocumentText className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                <p className="text-gray-600 dark:text-gray-400">
                  No posts published yet
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
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
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-600">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold tracking-tight mb-2 line-clamp-2 text-gray-900 dark:text-white">
                        {post.title}
                      </h3>

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
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
