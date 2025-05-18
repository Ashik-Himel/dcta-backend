import express from 'express';
import { getAdminStats } from '../controllers/generalController.js';
import { authorizeAdmin, authorizeUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/admin/stats', authorizeUser, authorizeAdmin, getAdminStats);

export default router;
