import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, getposts, updatepost, likePost, incrementViews, getRelatedPosts, getPopularTags } from '../controllers/post.controller.js';
import { postValidation, validate } from '../utils/validation.js';

const router = express.Router();

router.post('/create', verifyToken, postValidation, validate, create);
router.get('/getposts', getposts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost);
router.put('/updatepost/:postId/:userId', verifyToken, postValidation, validate, updatepost);
router.put('/like/:postId', verifyToken, likePost);
router.put('/view/:postId', incrementViews);
router.get('/related/:postId', getRelatedPosts);
router.get('/tags/popular', getPopularTags);

export default router;