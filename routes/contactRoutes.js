/* eslint-disable object-curly-newline */
import express from 'express';
import { getAllContacts, getRecentContacts } from '../controllers/contactController.js';
import { authorizeAdmin, authorizeUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/recent-contacts', authorizeUser, authorizeAdmin, getRecentContacts);
router.get('/all-contacts', authorizeUser, authorizeAdmin, getAllContacts);

export default router;
