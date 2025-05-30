import express from 'express';
import {
  createBadge,
  deleteBadge,
  getBadges,
  updateBadge,
} from '../controllers/badgeController.js';
import { authorizeAdmin, authorizeUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getBadges);
router.post('/', authorizeUser, authorizeAdmin, createBadge);
router.put('/badge/:id', authorizeUser, authorizeAdmin, updateBadge);
router.delete('/badge/:id', authorizeUser, authorizeAdmin, deleteBadge);

export default router;
