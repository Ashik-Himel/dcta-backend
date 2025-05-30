import express from 'express';
import multer from 'multer';
import {
  createStory,
  deleteStory,
  getFeaturedStories,
  getStories,
  updateStory,
} from '../controllers/storyController.js';
import { authorizeAdmin, authorizeUser } from '../middlewares/authMiddleware.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get('/', getStories);
router.get('/featured', getFeaturedStories);
router.post('/', authorizeUser, authorizeAdmin, upload.single('avatar'), createStory);
router.put('/story/:id', authorizeUser, authorizeAdmin, upload.single('avatar'), updateStory);
router.delete('/story/:id', authorizeUser, authorizeAdmin, deleteStory);

export default router;
