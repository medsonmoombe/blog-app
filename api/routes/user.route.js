import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  signout,
  test,
  updateUser,
  updateUserRole,
  toggleBookmark,
  getBookmarkedPosts,
  getAuthorProfile,
  toggleFollow,
  getFollowers,
  getFollowing,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);
router.put('/updateUserRole/:userId', verifyToken, updateUserRole);
router.put('/bookmark/:postId', verifyToken, toggleBookmark);
router.get('/bookmarks/posts', verifyToken, getBookmarkedPosts);
router.get('/author/:userId', getAuthorProfile);
router.put('/follow/:userId', verifyToken, toggleFollow);
router.get('/:userId/followers', getFollowers);
router.get('/:userId/following', getFollowing);

export default router;
