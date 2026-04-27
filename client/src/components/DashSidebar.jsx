import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
  HiBookmark,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
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

  const menuItems = [
    ...(currentUser?.isAdmin
      ? [
          {
            name: 'Dashboard',
            icon: HiChartPie,
            tab: 'dash',
            color: 'from-blue-500 to-cyan-500',
          },
        ]
      : []),
    {
      name: 'Profile',
      icon: HiUser,
      tab: 'profile',
      badge: currentUser?.isAdmin ? 'Admin' : 'User',
      color: 'from-primary to-primary-dark',
    },
    {
      name: 'Posts',
      icon: HiDocumentText,
      tab: 'posts',
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Bookmarks',
      icon: HiBookmark,
      tab: 'bookmarks',
      color: 'from-yellow-500 to-orange-500',
    },
    ...(currentUser?.isAdmin
      ? [
          {
            name: 'Users',
            icon: HiOutlineUserGroup,
            tab: 'users',
            color: 'from-orange-500 to-red-500',
          },
          {
            name: 'Comments',
            icon: HiAnnotation,
            tab: 'comments',
            color: 'from-green-500 to-emerald-500',
          },
        ]
      : []),
  ];

  return (
    <aside className="w-full md:w-64 md:min-h-screen bg-white/50 dark:bg-white/5 backdrop-blur-xl border-r border-gray-200 dark:border-white/10">
      <div className="p-6">
        {/* User Info */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={currentUser?.profilePicture}
              alt="user"
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{currentUser?.username}</p>
              <p className="text-xs text-gray-500 dark:text-gray-600 truncate">
                {currentUser?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = tab === item.tab || (!tab && item.tab === 'dash');
            return (
              <Link
                key={item.tab}
                to={`/dashboard?tab=${item.tab}`}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    isActive ? 'text-white' : 'text-gray-500 dark:text-gray-600 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                  }`}
                />
                <span className="flex-1 text-sm font-medium">{item.name}</span>
                {item.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-lg text-xs font-medium ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Sign Out */}
          <button
            onClick={handleSignout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 mt-4"
          >
            <HiArrowSmRight className="w-5 h-5" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}
