/* eslint-disable object-curly-newline */
import express from 'express';
import {
  createApplication,
  deleteApplication,
  getAllApplications,
  getApplication,
  getRecentApplications,
  updateAdminNote,
  updateApplicationStatus,
} from '../controllers/admissionController.js';
import { authorizeAdmin, authorizeUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/applications', createApplication);
router.get('/all-applications', authorizeUser, authorizeAdmin, getAllApplications);
router.get('/recent-applications', authorizeUser, authorizeAdmin, getRecentApplications);
router.get('/application/:id', authorizeUser, authorizeAdmin, getApplication);
router.put('/application/:id/status', authorizeUser, authorizeAdmin, updateApplicationStatus);
router.put('/application/:id/adminNote', authorizeUser, authorizeAdmin, updateAdminNote);
router.delete('/application/:id', authorizeUser, authorizeAdmin, deleteApplication);

export default router;
