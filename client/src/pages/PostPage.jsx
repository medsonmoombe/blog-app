import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CommentSection from '../components/CommentSection';
import ReadingProgress from '../components/ReadingProgress';
import SocialShare from '../components/SocialShare';
import BookmarkButton from '../components/BookmarkButton';
import { HiClock, HiCalendar, HiArrowLeft, HiHeart, HiOutlineHeart, HiEye } from 'react-icons/hi';

export default function PostPage() {
  const { postSlug } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [views, setViews] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLikesCount(data.posts[0].likes?.length || 0);
          setViews(data.posts[0].views || 0);
          if (currentUser) {
            setLiked(data.posts[0].likes?.includes(currentUser._id));
          }
          setLoading(false);
          setError(false);
          
          // Fetch author info
          const authorRes = await fetch(`/api/user/${data.posts[0].userId}`);
          const authorData = await authorRes.json();
          if (authorRes.ok) {
            setAuthor(authorData);
          }
          
          // Increment view count (backend handles duplicate prevention)
          const postId = data.posts[0]._id;
          fetch(`/api/post/view/${postId}`, { method: 'PUT' })
            .then(res => res.json())
            .then(data => {
              if (data.views) {
                setViews(data.views);
              }
            })
            .catch(err => console.log('View count error:', err));
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug, currentUser]);

  useEffect(() => {
    if (!post) return;
    
    const fetchRelatedPosts = async () => {
      try {
        const res = await fetch(`/api/post/related/${post._id}`);
        const data = await res.json();
        if (res.ok) {
          setRelatedPosts(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRelatedPosts();
  }, [post]);

  const handleLike = async () => {
    if (!currentUser) {
      alert('Please sign in to like posts');
      return;
    }

    try {
      const res = await fetch(`/api/post/like/${post._id}`, {
        method: 'PUT',
      });
      const data = await res.json();
      if (res.ok) {
        setLiked(!liked);
        setLikesCount(data.likesCount);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="font-inter min-h-screen">
      {/* Reading Progress Bar */}
      <ReadingProgress />
      
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
      <div className="glow-orb-1" style={{ top: '-300px', right: '-200px' }} />
      <div className="glow-orb-2" style={{ bottom: '-200px', left: '-150px' }} />

      <main className="relative z-10">
        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <Link
            to="/search"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-light transition-colors"
          >
            <HiArrowLeft className="w-4 h-4" />
            Back to articles
          </Link>
        </div>

        {/* Hero Section */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <Link
              to={`/search?category=${post?.category}`}
              className="inline-block mb-6"
            >
              <span className="px-4 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 transition-colors">
                {post?.category}
              </span>
            </Link>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              {post?.title}
            </h1>

            {/* Author */}
            {author && (
              <Link
                to={`/author/${post?.userId}`}
                className="inline-flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-400 hover:text-primary-light transition-colors"
              >
                <img
                  src={author.profilePicture}
                  alt={author.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm">
                  By <span className="font-medium">{author.username}</span>
                </span>
              </Link>
            )}

            {/* Tags */}
            {post?.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag, index) => (
                  <Link
                    key={index}
                    to={`/search?tag=${tag}`}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary-light border border-primary/20 hover:bg-primary/20 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <HiCalendar className="w-4 h-4" />
                <span>{post && new Date(post.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <HiClock className="w-4 h-4" />
                <span>{post && Math.ceil(post.content.length / 1000)} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <HiEye className="w-4 h-4" />
                <span>{views} views</span>
              </div>
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 hover:text-red-500 transition-colors ${
                  liked ? 'text-red-500' : ''
                }`}
              >
                {liked ? (
                  <HiHeart className="w-4 h-4" />
                ) : (
                  <HiOutlineHeart className="w-4 h-4" />
                )}
                <span>{likesCount} {likesCount === 1 ? 'like' : 'likes'}</span>
              </button>
              <BookmarkButton postId={post?._id} size="md" />
            </div>

            {/* Social Share */}
            <div className="mt-6">
              <SocialShare 
                url={window.location.href}
                title={post?.title}
                description={post?.metaDescription || post?.content.replace(/<[^>]*>/g, '').substring(0, 150)}
              />
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="px-6 mb-12">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden aspect-video">
              <img
                src={post?.image}
                alt={post?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="px-6 mb-20">
          <div className="max-w-3xl mx-auto">
            <article
              className="prose prose-lg dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary-light prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-pre:bg-[#0B0E14] prose-pre:border prose-pre:border-white/10 max-w-none"
              dangerouslySetInnerHTML={{ __html: post?.content }}
            />
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/5 to-transparent" />
        </div>

        {/* Newsletter CTA */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 opacity-15"
                style={{
                  background: 'radial-gradient(circle, #5F8D75, transparent 70%)',
                  filter: 'blur(60px)',
                }}
              />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
                  Enjoyed this article?
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
                  Subscribe to get notified when I publish new content about web development.
                </p>
                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-5 py-3 rounded-xl text-sm bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className="px-6 mb-20">
          <div className="max-w-4xl mx-auto">
            <CommentSection postId={post?._id} />
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/5 to-transparent" />
        </div>

        {/* Related Articles */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary-light border border-primary/20 mb-4">
                  Related Articles
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                  You Might Also Like
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost._id}
                    to={`/post/${relatedPost.slug}`}
                    className="glass-card rounded-2xl overflow-hidden group"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {relatedPost.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-600">
                          {Math.ceil(relatedPost.content.length / 1000)} min read
                        </span>
                      </div>
                      <h3 className="text-base font-semibold tracking-tight mb-2 line-clamp-2 text-gray-900 dark:text-white">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                        {relatedPost.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
