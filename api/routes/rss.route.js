import express from 'express';
import { generateRSSFeed } from '../controllers/rss.controller.js';

const router = express.Router();

router.get('/', generateRSSFeed);

export default router;
