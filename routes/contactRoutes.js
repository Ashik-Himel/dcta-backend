/* eslint-disable object-curly-newline */
import express from 'express';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContact,
  getRecentContacts,
  updateContactStatus,
} from '../controllers/contactController.js';
import { authorizeAdmin, authorizeUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/contacts', createContact);
router.get('/recent-contacts', authorizeUser, authorizeAdmin, getRecentContacts);
router.get('/all-contacts', authorizeUser, authorizeAdmin, getAllContacts);
router.get('/contact/:id', authorizeUser, authorizeAdmin, getContact);
router.put('/contact/:id/status', authorizeUser, authorizeAdmin, updateContactStatus);
router.delete('/contact/:id', authorizeUser, authorizeAdmin, deleteContact);

export default router;
