import express from 'express';
import {
  createApplication,
  createApplicationEmailSent,
  deleteApplication,
  getAllApplications,
  getApplication,
  getRecentApplications,
  updateAdminNote,
  updateApplicationStatus,
} from '../controllers/applicationController.js';
import { authorizeAdmin, authorizeUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', createApplication);
router.post('/email', createApplicationEmailSent);
router.get('/', authorizeUser, authorizeAdmin, getAllApplications);
router.get('/recent', authorizeUser, authorizeAdmin, getRecentApplications);
router.get('/application/:id', authorizeUser, authorizeAdmin, getApplication);
router.delete('/application/:id', authorizeUser, authorizeAdmin, deleteApplication);
router.put('/application/:id/status', authorizeUser, authorizeAdmin, updateApplicationStatus);
router.put('/application/:id/adminNote', authorizeUser, authorizeAdmin, updateAdminNote);

export default router;
