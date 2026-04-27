import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HiArrowRight, HiMail, HiCode, HiTerminal } from 'react-icons/hi';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=5');
        const data = await res.json();
        if (res.ok && data.posts) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log('Error fetching posts:', error);
      }
    };
    fetchPosts();

    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    alert('Thanks for subscribing! 🎉');
    setEmail('');
  };

  return (
    <div className="font-inter">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
      <div className="glow-orb-1" style={{ top: '-200px', right: '-200px' }} />
      <div className="glow-orb-2" style={{ bottom: '-100px', left: '-150px' }} />

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center pt-16">
          <div className="max-w-6xl mx-auto px-6 py-24 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div>
                <div className="animate-fade-up">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-primary/10 border border-primary/20">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-medium text-primary-light">
                      Currently writing about Web Dev
                    </span>
                  </div>
                </div>

                <h1 className="animate-fade-up-delay-1 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight mb-6">
                  Welcome to
                  <br />
                  <span className="gradient-text">my Blog</span>
                </h1>

                <p className="animate-fade-up-delay-2 text-base md:text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-md">
                  Exploring the world of web development, one article at a time. I share insights on JavaScript, React, and modern development practices.
                </p>

                <div className="animate-fade-up-delay-3 flex flex-wrap gap-4">
                  <Link
                    to="/search"
                    className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span>Read Articles</span>
                    <HiArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-7 py-3 bg-transparent border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm hover:bg-gray-50 dark:hover:bg-white/5 hover:border-primary/40 transition-all duration-300"
                  >
                    About Me
                  </Link>
                </div>

                {/* Mini stats */}
                <div className="animate-fade-up-delay-4 flex gap-8 mt-12 pt-8 border-t border-gray-200 dark:border-white/5">
                  <div>
                    <div className="text-2xl font-semibold gradient-text">{posts.length || 0}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-600 mt-1">Articles</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold gradient-text">1.2K</div>
                    <div className="text-xs text-gray-500 dark:text-gray-600 mt-1">Readers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold gradient-text">8</div>
                    <div className="text-xs text-gray-500 dark:text-gray-600 mt-1">Topics</div>
                  </div>
                </div>
              </div>

              {/* Right - Code Preview Card */}
              <div className="animate-fade-up-delay-2 hidden lg:block">
                <div className="relative">
                  {/* Decorative ring */}
                  <div
                    className="absolute -inset-4 rounded-3xl opacity-20"
                    style={{
                      background: 'conic-gradient(from 0deg, #5F8D75, #8B5CF6, #5F8D75)',
                      filter: 'blur(40px)',
                    }}
                  />

                  <div className="relative bg-[#0B0E14] border border-white/5 rounded-2xl p-6">
                    {/* Window dots */}
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-3 h-3 rounded-full bg-[#DF6B6B]" />
                      <div className="w-3 h-3 rounded-full bg-[#F5C150]" />
                      <div className="w-3 h-3 rounded-full bg-[#59C154]" />
                      <span className="ml-3 text-xs text-gray-600">blog.js</span>
                    </div>

                    <pre className="text-sm leading-relaxed">
                      <code>
                        <span className="text-purple-400">const</span>{' '}
                        <span className="text-blue-400">blog</span> = {'{'}
                        {`\n  `}<span className="text-red-300">author</span>:{' '}
                        <span className="text-green-400">"Emmanuel"</span>,
                        {`\n  `}<span className="text-red-300">topics</span>: [
                        {`\n    `}<span className="text-green-400">"JavaScript"</span>,
                        {`\n    `}<span className="text-green-400">"React"</span>,
                        {`\n    `}<span className="text-green-400">"Web Dev"</span>
                        {`\n  `}],
                        {`\n  `}<span className="text-red-300">motto</span>:{' '}
                        <span className="text-green-400">"Learn & Share"</span>
                        {`\n`}{'};'}
                      </code>
                    </pre>

                    {/* Blinking cursor */}
                    <div className="mt-2 flex items-center gap-1">
                      <span className="text-primary">→</span>
                      <span className="text-gray-600 text-sm">Ready to explore</span>
                      <span
                        className="inline-block w-2 h-4 bg-primary ml-1"
                        style={{ animation: 'blink 1s step-end infinite' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* JavaScript Feature Section */}
        <section className="py-24 reveal">
          <div className="max-w-6xl mx-auto px-6">
            <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Background decoration */}
              <div
                className="absolute top-0 right-0 w-72 h-72 opacity-10"
                style={{
                  background: 'radial-gradient(circle, #F7DF1E, transparent 70%)',
                  filter: 'blur(60px)',
                }}
              />

              <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
                {/* Left Content */}
                <div>
                  <span className="inline-block px-4 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary-light border border-primary/20 mb-5">
                    Featured
                  </span>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
                    Want to learn more about{' '}
                    <span className="gradient-text-purple">JavaScript</span>?
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                    Dive deep into JavaScript fundamentals, advanced patterns, and real-world applications. From closures to async/await, I cover everything you need to level up your skills.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {['ES6+', 'Async/Await', 'Closures', 'Promises', 'DOM API'].map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/search?category=javascript"
                    className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span>Start Learning</span>
                    <HiArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Right - JS Logo + Orbiting items */}
                <div className="flex items-center justify-center">
                  <div className="relative" style={{ width: '280px', height: '280px' }}>
                    {/* Orbiting elements */}
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ animation: 'spin-slow 30s linear infinite' }}
                    >
                      <div style={{ animation: 'orbit 15s linear infinite' }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-500/10 border border-purple-500/30">
                          <HiCode className="w-5 h-5 text-purple-400" />
                        </div>
                      </div>
                    </div>
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ animation: 'spin-slow 25s linear infinite reverse' }}
                    >
                      <div style={{ animation: 'orbit 20s linear infinite reverse' }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/30">
                          <HiTerminal className="w-5 h-5 text-primary-light" />
                        </div>
                      </div>
                    </div>

                    {/* Center JS Logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl font-bold text-black bg-gradient-to-br from-[#F7DF1E] to-[#E8C800] shadow-lg shadow-yellow-500/20"
                        style={{ animation: 'js-float 4s ease-in-out infinite' }}
                      >
                        JS
                      </div>
                    </div>

                    {/* Floating dots */}
                    <div className="absolute top-4 right-8 w-2 h-2 rounded-full bg-purple-500 opacity-40 animate-pulse" />
                    <div
                      className="absolute bottom-8 left-6 w-3 h-3 rounded-full bg-primary opacity-30 animate-pulse"
                      style={{ animationDelay: '0.5s' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/5 to-transparent" />
        </div>

        {/* Recent Posts Section */}
        <section id="posts" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            {/* Section Header */}
            <div className="flex items-end justify-between mb-12 reveal">
              <div>
                <span className="inline-block px-4 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary-light border border-primary/20 mb-4">
                  Blog
                </span>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Recent Posts</h2>
              </div>
              <Link
                to="/search"
                className="hidden md:inline-flex items-center gap-2 text-sm text-primary-light hover:text-white transition-colors group"
              >
                View all posts
                <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Posts Grid */}
            {posts && posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                  <Link
                    key={post._id}
                    to={`/post/${post.slug}`}
                    className={`glass-card rounded-2xl overflow-hidden reveal ${
                      index === 0 ? 'md:col-span-2' : ''
                    }`}
                  >
                    <div className={index === 0 ? 'grid md:grid-cols-2' : ''}>
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className={index === 0 ? 'p-8 flex flex-col justify-center' : 'p-6'}>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                            {post.category}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {Math.ceil(post.content.length / 1000)} min read
                          </span>
                        </div>
                        <h3 className={`font-semibold tracking-tight mb-3 text-gray-900 dark:text-white ${index === 0 ? 'text-xl' : 'text-base'}`}>
                          {post.title}
                        </h3>
                        {index === 0 && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 line-clamp-2">
                            {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No posts yet. Check back soon!</p>
              </div>
            )}

            {/* Mobile view all link */}
            <div className="mt-8 text-center md:hidden">
              <Link to="/search" className="inline-flex items-center gap-2 text-sm text-primary-light">
                View all posts
                <HiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/5 to-transparent" />
        </div>

        {/* Newsletter Section */}
        <section className="py-24 reveal">
          <div className="max-w-6xl mx-auto px-6">
            <div className="glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              {/* Decorative */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 opacity-15"
                style={{
                  background: 'radial-gradient(circle, #5F8D75, transparent 70%)',
                  filter: 'blur(60px)',
                }}
              />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-primary/10 border border-primary/20">
                  <HiMail className="w-6 h-6 text-primary-light" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">Stay in the Loop</h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
                  Get notified when I publish new articles. No spam, unsubscribe anytime.
                </p>

                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-3 rounded-xl text-sm bg-white/5 border border-white/10 text-gray-900 dark:text-white placeholder-gray-500 focus:bg-white/10 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
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
      </main>
    </div>
  );
}
