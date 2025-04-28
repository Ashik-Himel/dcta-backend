/* eslint-disable object-curly-newline */
import express from 'express';
import {
  createApplication,
  getAllApplications,
  getRecentApplications,
} from '../controllers/admissionController.js';
import { authorizeAdmin, authorizeUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', createApplication);
router.get('/recent-applications', authorizeUser, authorizeAdmin, getRecentApplications);
router.get('/all-applications', authorizeUser, authorizeAdmin, getAllApplications);

export default router;
