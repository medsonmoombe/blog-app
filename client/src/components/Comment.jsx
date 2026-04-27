import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Comment({ comment, onLike, onEdit, onDelete, onReply, depth = 0 }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleReply = async () => {
    if (replyContent.trim()) {
      await onReply(comment._id, replyContent);
      setReplyContent('');
      setIsReplying(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6" style={{ marginLeft: `${depth * 2}rem` }}>
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            className="w-10 h-10 rounded-lg object-cover"
            src={user.profilePicture}
            alt={user.username}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-sm truncate">
              {user ? `@${user.username}` : 'anonymous user'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-600">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>

          {/* Comment Body */}
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                className="w-full px-4 py-3 rounded-xl text-sm bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                rows="3"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium text-xs hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-transparent border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-xs hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                {comment.content}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-2 border-t border-gray-200 dark:border-white/10">
                <button
                  onClick={() => onLike(comment._id)}
                  className={`flex items-center gap-1.5 text-xs transition-colors ${
                    currentUser && comment.likes.includes(currentUser._id)
                      ? 'text-blue-500'
                      : 'text-gray-500 dark:text-gray-600 hover:text-blue-500'
                  }`}
                >
                  <FaThumbsUp className="w-3.5 h-3.5" />
                  {comment.numberOfLikes > 0 && (
                    <span>
                      {comment.numberOfLikes} {comment.numberOfLikes === 1 ? 'like' : 'likes'}
                    </span>
                  )}
                </button>

                {currentUser && depth < 3 && (
                  <button
                    onClick={() => setIsReplying(!isReplying)}
                    className="text-xs text-gray-500 dark:text-gray-600 hover:text-primary-light transition-colors"
                  >
                    Reply
                  </button>
                )}

                {currentUser &&
                  (currentUser._id === comment.userId || currentUser.isAdmin) && (
                    <>
                      <button
                        onClick={handleEdit}
                        className="text-xs text-gray-500 dark:text-gray-600 hover:text-primary-light transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(comment._id)}
                        className="text-xs text-gray-500 dark:text-gray-600 hover:text-red-500 transition-colors"
                      >
                        Delete
                      </button>
                    </>
                  )}
              </div>

              {/* Reply Form */}
              {isReplying && (
                <div className="mt-4 space-y-3">
                  <textarea
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    rows="3"
                    placeholder="Write a reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    maxLength="200"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleReply}
                      className="px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium text-xs hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => setIsReplying(false)}
                      className="px-4 py-2 bg-transparent border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-xs hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
