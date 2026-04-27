import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HiUserAdd, HiUserRemove } from 'react-icons/hi';

export default function FollowButton({ userId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser.following) {
      setIsFollowing(currentUser.following.includes(userId));
    }
  }, [currentUser, userId]);

  const handleFollow = async () => {
    if (!currentUser) {
      navigate('/sign-in');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/user/follow/${userId}`, {
        method: 'PUT',
      });
      const data = await res.json();
      if (res.ok) {
        setIsFollowing(data.isFollowing);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser || currentUser._id === userId) {
    return null;
  }

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
        isFollowing
          ? 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-white/20'
          : 'bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-lg hover:shadow-primary/30'
      }`}
    >
      {isFollowing ? (
        <>
          <HiUserRemove className="w-4 h-4" />
          Unfollow
        </>
      ) : (
        <>
          <HiUserAdd className="w-4 h-4" />
          Follow
        </>
      )}
    </button>
  );
}
