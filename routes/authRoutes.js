/* eslint-disable object-curly-newline */
import express from 'express';
import { forgotPassword, getUser, login, resetPassword } from '../controllers/authController.js';
import authorizeUser from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password', resetPassword);
router.get('/user', authorizeUser, getUser);

export default router;
