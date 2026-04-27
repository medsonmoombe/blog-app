import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  HiSearch,
  HiFilter,
  HiX,
  HiAdjustments,
  HiArrowRight,
} from 'react-icons/hi';
import PopularTags from '../components/PopularTags';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
    tag: '',
    author: '',
    startDate: '',
    endDate: '',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    const tagFromUrl = urlParams.get('tag');
    const authorFromUrl = urlParams.get('author');
    const startDateFromUrl = urlParams.get('startDate');
    const endDateFromUrl = urlParams.get('endDate');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl || tagFromUrl || authorFromUrl || startDateFromUrl || endDateFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || 'desc',
        category: categoryFromUrl || 'uncategorized',
        tag: tagFromUrl || '',
        author: authorFromUrl || '',
        startDate: startDateFromUrl || '',
        endDate: endDateFromUrl || '',
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  useEffect(() => {
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
  }, [posts]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
    if (e.target.id === 'author') {
      setSidebarData({ ...sidebarData, author: e.target.value });
    }
    if (e.target.id === 'startDate') {
      setSidebarData({ ...sidebarData, startDate: e.target.value });
    }
    if (e.target.id === 'endDate') {
      setSidebarData({ ...sidebarData, endDate: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    if (sidebarData.author) urlParams.set('author', sidebarData.author);
    if (sidebarData.startDate) urlParams.set('startDate', sidebarData.startDate);
    if (sidebarData.endDate) urlParams.set('endDate', sidebarData.endDate);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    setShowFilters(false);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  const clearFilters = () => {
    setSidebarData({
      searchTerm: '',
      sort: 'desc',
      category: 'uncategorized',
      tag: '',
      author: '',
      startDate: '',
      endDate: '',
    });
    navigate('/search');
  };

  const categories = [
    { value: 'uncategorized', label: 'All Categories' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'reactjs', label: 'React.js' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'typescript', label: 'TypeScript' },
  ];

  return (
    <div className="font-inter min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
      <div className="glow-orb-1" style={{ top: '-300px', right: '-200px' }} />
      <div className="glow-orb-2" style={{ bottom: '-200px', left: '-150px' }} />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="animate-fade-up">
                <span className="inline-block px-4 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary-light border border-primary/20 mb-6">
                  Explore
                </span>
              </div>
              <h1 className="animate-fade-up-delay-1 text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-6">
                Search{' '}
                <span className="gradient-text">Articles</span>
              </h1>
              <p className="animate-fade-up-delay-2 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                Find the perfect article to level up your web development skills
              </p>
            </div>

            {/* Search Bar */}
            <div className="animate-fade-up-delay-3 max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="relative">
                <HiSearch className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-600" />
                <input
                  type="text"
                  id="searchTerm"
                  placeholder="Search articles..."
                  value={sidebarData.searchTerm}
                  onChange={handleChange}
                  className="w-full pl-14 pr-32 py-4 rounded-2xl text-sm bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 focus:bg-white dark:focus:bg-white/10 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 bg-white/5 border border-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                  >
                    <HiFilter className="w-4 h-4" />
                    <span className="hidden sm:inline">Filters</span>
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Filters Panel */}
        {showFilters && (
          <section className="pb-12">
            <div className="max-w-6xl mx-auto px-6">
              <div className="glass-card rounded-2xl p-6 animate-fade-up">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <HiAdjustments className="w-5 h-5 text-primary-light" />
                    <h3 className="text-lg font-semibold">Filters</h3>
                  </div>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <HiX className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                      Category
                    </label>
                    <select
                      id="category"
                      value={sidebarData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                      Sort By
                    </label>
                    <select
                      id="sort"
                      value={sidebarData.sort}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      <option value="desc">Latest First</option>
                      <option value="asc">Oldest First</option>
                      <option value="views">Most Viewed</option>
                      <option value="likes">Most Liked</option>
                    </select>
                  </div>

                  {/* Author Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                      Author Username
                    </label>
                    <input
                      type="text"
                      id="author"
                      placeholder="Filter by author..."
                      value={sidebarData.author}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  {/* Date Range */}
                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                      Date Range
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        id="startDate"
                        value={sidebarData.startDate}
                        onChange={handleChange}
                        className="flex-1 px-4 py-3 rounded-xl text-sm bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      <input
                        type="date"
                        id="endDate"
                        value={sidebarData.endDate}
                        onChange={handleChange}
                        className="flex-1 px-4 py-3 rounded-xl text-sm bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-transparent border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Active Filters */}
        {(sidebarData.searchTerm || sidebarData.category !== 'uncategorized' || sidebarData.tag) && (
          <section className="pb-8">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex flex-wrap gap-3 items-center">
                <span className="text-sm text-gray-500 dark:text-gray-600">Active filters:</span>
                {sidebarData.searchTerm && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-primary/10 text-primary-light border border-primary/20">
                    Search: "{sidebarData.searchTerm}"
                    <button
                      onClick={() => {
                        setSidebarData({ ...sidebarData, searchTerm: '' });
                        const urlParams = new URLSearchParams(location.search);
                        urlParams.delete('searchTerm');
                        navigate(`/search?${urlParams.toString()}`);
                      }}
                      className="hover:text-white transition-colors"
                    >
                      <HiX className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {sidebarData.category !== 'uncategorized' && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {categories.find((c) => c.value === sidebarData.category)?.label}
                    <button
                      onClick={() => {
                        setSidebarData({ ...sidebarData, category: 'uncategorized' });
                        const urlParams = new URLSearchParams(location.search);
                        urlParams.set('category', 'uncategorized');
                        navigate(`/search?${urlParams.toString()}`);
                      }}
                      className="hover:text-white transition-colors"
                    >
                      <HiX className="w-4 h-4" />
                    </button>
                  </span>
                )}
                {sidebarData.tag && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-primary/10 text-primary-light border border-primary/20">
                    Tag: #{sidebarData.tag}
                    <button
                      onClick={() => {
                        setSidebarData({ ...sidebarData, tag: '' });
                        const urlParams = new URLSearchParams(location.search);
                        urlParams.delete('tag');
                        navigate(`/search?${urlParams.toString()}`);
                      }}
                      className="hover:text-white transition-colors"
                    >
                      <HiX className="w-4 h-4" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Results Section */}
        <section className="pb-20">
          <div className="max-w-6xl mx-auto px-6">
            {/* Popular Tags Widget */}
            <div className="mb-8">
              <PopularTags />
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight mb-2">
                  {loading ? 'Searching...' : `${posts.length} Article${posts.length !== 1 ? 's' : ''} Found`}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-600">
                  {sidebarData.sort === 'desc' ? 'Newest first' : 'Oldest first'}
                </p>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
                <p className="text-gray-500 dark:text-gray-400">Searching articles...</p>
              </div>
            )}

            {/* No Results */}
            {!loading && posts.length === 0 && (
              <div className="glass-card rounded-3xl p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                  <HiSearch className="w-10 h-10 text-gray-400 dark:text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Results Grid */}
            {!loading && posts.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                  <Link
                    key={post._id}
                    to={`/post/${post.slug}`}
                    className="glass-card rounded-2xl overflow-hidden reveal"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-600">
                          {Math.ceil(post.content.length / 1000)} min read
                        </span>
                      </div>
                      <h3 className="text-base font-semibold tracking-tight mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
                        {post.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-600">
                          {new Date(post.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-primary-light hover:text-white transition-colors">
                          Read more
                          <HiArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Show More Button */}
            {showMore && (
              <div className="text-center mt-12">
                <button
                  onClick={handleShowMore}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm hover:bg-gray-50 dark:hover:bg-white/5 hover:border-primary/40 transition-all duration-300"
                >
                  Load More Articles
                  <HiArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
