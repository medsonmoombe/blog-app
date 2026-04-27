import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import { HiOutlineExclamationCircle, HiChatAlt2 } from 'react-icons/hi';

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
          parentId: null,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleReply = async (parentId, content) => {
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          postId,
          userId: currentUser._id,
          parentId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComments([data, ...comments]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <HiChatAlt2 className="w-6 h-6 text-primary-light" />
          <h2 className="text-2xl font-semibold tracking-tight">Comments</h2>
          {comments.length > 0 && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary-light border border-primary/20">
              {comments.length}
            </span>
          )}
        </div>

        {currentUser ? (
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <img
              className="w-8 h-8 object-cover rounded-lg"
              src={currentUser.profilePicture}
              alt=""
            />
            <p>
              Signed in as{' '}
              <Link
                to="/dashboard?tab=profile"
                className="text-primary-light hover:underline font-medium"
              >
                @{currentUser.username}
              </Link>
            </p>
          </div>
        ) : (
          <div className="glass-card rounded-xl p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You must be signed in to comment.
            </p>
            <Link
              to="/sign-in"
              className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>

      {/* Comment Form */}
      {currentUser && (
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 mb-8">
          <textarea
            placeholder="Add a comment..."
            rows="4"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className="w-full px-4 py-3 rounded-xl text-sm bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
          />
          <div className="flex justify-between items-center mt-4">
            <p className="text-xs text-gray-500 dark:text-gray-600">
              {200 - comment.length} characters remaining
            </p>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
            >
              Submit
            </button>
          </div>
          {commentError && (
            <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
              <HiOutlineExclamationCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{commentError}</p>
            </div>
          )}
        </form>
      )}

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <HiChatAlt2 className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
          <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments
            .filter((c) => !c.parentId)
            .map((comment) => (
              <div key={comment._id}>
                <Comment
                  comment={comment}
                  onLike={handleLike}
                  onEdit={handleEdit}
                  onDelete={(commentId) => {
                    setShowModal(true);
                    setCommentToDelete(commentId);
                  }}
                  onReply={handleReply}
                  depth={0}
                />
                {comments
                  .filter((c) => c.parentId === comment._id)
                  .map((reply) => (
                    <div key={reply._id}>
                      <Comment
                        comment={reply}
                        onLike={handleLike}
                        onEdit={handleEdit}
                        onDelete={(commentId) => {
                          setShowModal(true);
                          setCommentToDelete(commentId);
                        }}
                        onReply={handleReply}
                        depth={1}
                      />
                      {comments
                        .filter((c) => c.parentId === reply._id)
                        .map((nestedReply) => (
                          <Comment
                            key={nestedReply._id}
                            comment={nestedReply}
                            onLike={handleLike}
                            onEdit={handleEdit}
                            onDelete={(commentId) => {
                              setShowModal(true);
                              setCommentToDelete(commentId);
                            }}
                            onReply={handleReply}
                            depth={2}
                          />
                        ))}
                    </div>
                  ))}
              </div>
            ))}
        </div>
      )}

      {/* Delete Modal */}
      {showModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setShowModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="glass-card rounded-2xl p-8 max-w-md w-full">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/10 flex items-center justify-center">
                  <HiOutlineExclamationCircle className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Delete Comment</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Are you sure you want to delete this comment? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDelete(commentToDelete)}
                    className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-medium text-sm hover:bg-red-600 transition-all duration-300"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 bg-transparent border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
