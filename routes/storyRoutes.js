import express from 'express';
import {
  createStory,
  deleteStory,
  getFeaturedStories,
  getStories,
  updateStory,
} from '../controllers/storyController.js';
import { authorizeAdmin, authorizeUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getStories);
router.get('/featured', getFeaturedStories);
router.post('/', authorizeUser, authorizeAdmin, createStory);
router.put('/story/:id', authorizeUser, authorizeAdmin, updateStory);
router.delete('/story/:id', authorizeUser, authorizeAdmin, deleteStory);

export default router;
