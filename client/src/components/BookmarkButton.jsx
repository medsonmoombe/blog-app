import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HiBookmark, HiOutlineBookmark } from 'react-icons/hi';
import { useToast } from '../context/ToastContext';
import { updateBookmarks } from '../redux/user/userSlice';

export default function BookmarkButton({ postId, size = 'md' }) {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.bookmarks) {
      setBookmarked(currentUser.bookmarks.includes(postId));
    }
  }, [currentUser, postId]);

  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      showToast('Please sign in to bookmark posts', 'error');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/user/bookmark/${postId}`, {
        method: 'PUT',
      });
      const data = await res.json();

      if (res.ok) {
        setBookmarked(data.bookmarked);
        showToast(
          data.bookmarked ? 'Post bookmarked!' : 'Bookmark removed',
          'success'
        );
        
        // Update Redux state
        dispatch(updateBookmarks(data.bookmarks));
      } else {
        showToast(data.message || 'Failed to bookmark', 'error');
      }
    } catch (error) {
      showToast('Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      onClick={handleBookmark}
      disabled={loading}
      className={`p-2 rounded-lg transition-all ${
        bookmarked
          ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      title={bookmarked ? 'Remove bookmark' : 'Bookmark post'}
    >
      {bookmarked ? (
        <HiBookmark className={sizeClasses[size]} />
      ) : (
        <HiOutlineBookmark className={sizeClasses[size]} />
      )}
    </button>
  );
}
