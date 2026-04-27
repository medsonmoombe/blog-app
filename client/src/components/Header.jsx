import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiSearch, HiMoon, HiSun, HiMenu, HiX, HiPencil } from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
  ];

  if (currentUser) {
    navLinks.push({ name: 'Create', path: '/create-post' });
    navLinks.push({ name: 'Dashboard', path: '/dashboard' });
  }

  return (
    <>
      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-[#0a0a0a] border-l border-gray-200 dark:border-white/10 z-50 transform transition-transform duration-300 md:hidden ${
          showMobileMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <button
            onClick={() => setShowMobileMenu(false)}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
          >
            <HiX className="w-6 h-6" />
          </button>

          <div className="mt-12 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setShowMobileMenu(false)}
                className={`block text-lg font-medium transition-colors ${
                  path === link.path
                    ? 'text-primary-light'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-light'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {!currentUser && (
            <div className="mt-8">
              <Link
                to="/sign-in"
                onClick={() => setShowMobileMenu(false)}
                className="block w-full px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium text-sm text-center hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-30 h-16 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5">
        <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
              <HiPencil className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-semibold tracking-tight hidden sm:inline">Emmanuel's Blog</span>
          </Link>

          {/* Search (desktop) */}
          <div className="hidden md:flex items-center flex-1 max-w-xs mx-8">
            <form onSubmit={handleSubmit} className="relative w-full">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-600" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl text-sm bg-gray-100 dark:bg-white/5 border border-transparent dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 focus:bg-white dark:focus:bg-white/10 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </form>
          </div>

          {/* Nav Links (desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors ${
                  path === link.path
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {link.name}
                {path === link.path && (
                  <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary-light" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search Icon (mobile) */}
            <Link
              to="/search"
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
            >
              <HiSearch className="w-5 h-5" />
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
            >
              {theme === 'light' ? (
                <HiMoon className="w-5 h-5" />
              ) : (
                <HiSun className="w-5 h-5" />
              )}
            </button>

            {/* User Menu or Sign In */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                >
                  <img
                    src={currentUser.profilePicture}
                    alt="user"
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 glass-card rounded-2xl p-2 z-50">
                      <div className="px-3 py-2 border-b border-gray-200 dark:border-white/10">
                        <p className="text-sm font-medium truncate">@{currentUser.username}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-600 truncate">
                          {currentUser.email}
                        </p>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/dashboard?tab=profile"
                          onClick={() => setShowUserMenu(false)}
                          className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/dashboard"
                          onClick={() => setShowUserMenu(false)}
                          className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                        >
                          Dashboard
                        </Link>
                        {currentUser.isAdmin && (
                          <Link
                            to="/create-post"
                            onClick={() => setShowUserMenu(false)}
                            className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                          >
                            Create Post
                          </Link>
                        )}
                      </div>
                      <div className="pt-2 border-t border-gray-200 dark:border-white/10">
                        <button
                          onClick={() => {
                            handleSignout();
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-red-500 rounded-lg hover:bg-red-500/10 transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/sign-in"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(true)}
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
            >
              <HiMenu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
