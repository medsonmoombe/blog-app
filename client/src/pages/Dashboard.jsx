import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';
import DashBookmarks from '../components/DashBookmarks';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="font-inter min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
      <div className="glow-orb-1" style={{ top: '-300px', right: '-200px' }} />
      <div className="glow-orb-2" style={{ bottom: '-200px', left: '-150px' }} />

      <div className="relative z-10 flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <DashSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {tab === 'profile' && <DashProfile />}
          {tab === 'posts' && <DashPosts />}
          {tab === 'users' && <DashUsers />}
          {tab === 'comments' && <DashComments />}
          {tab === 'dash' && <DashboardComp />}
          {tab === 'bookmarks' && <DashBookmarks />}
        </div>
      </div>
    </div>
  );
}
