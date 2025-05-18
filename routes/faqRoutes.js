/* eslint-disable object-curly-newline */
import express from 'express';
import { createFaq, deleteFaq, getFaqs, updateFaq } from '../controllers/faqController.js';
import { authorizeAdmin, authorizeUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getFaqs);
router.post('/', authorizeUser, authorizeAdmin, createFaq);
router.put('/faq/:id', authorizeUser, authorizeAdmin, updateFaq);
router.delete('/faq/:id', authorizeUser, authorizeAdmin, deleteFaq);

export default router;
