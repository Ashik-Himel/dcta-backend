/* eslint-disable object-curly-newline */
import express from 'express';
import {
  createContact,
  createContactEmailSent,
  deleteContact,
  getAllContacts,
  getContact,
  getRecentContacts,
  updateContactStatus,
} from '../controllers/contactController.js';
import { authorizeAdmin, authorizeUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', createContact);
router.post('/email', createContactEmailSent);
router.get('/', authorizeUser, authorizeAdmin, getAllContacts);
router.get('/recent', authorizeUser, authorizeAdmin, getRecentContacts);
router.get('/contact/:id', authorizeUser, authorizeAdmin, getContact);
router.delete('/contact/:id', authorizeUser, authorizeAdmin, deleteContact);
router.put('/contact/:id/status', authorizeUser, authorizeAdmin, updateContactStatus);

export default router;
