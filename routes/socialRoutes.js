import express from 'express';
import {
  createSocial,
  deleteSocial,
  getSocials,
  updateSocial,
} from '../controllers/socialController.js';
import { authorizeAdmin, authorizeUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getSocials);
router.post('/', authorizeUser, authorizeAdmin, createSocial);
router.put('/social/:id', authorizeUser, authorizeAdmin, updateSocial);
router.delete('/social/:id', authorizeUser, authorizeAdmin, deleteSocial);

export default router;
