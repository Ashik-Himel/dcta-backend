import express from 'express';
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../controllers/categoryController.js';
import { authorizeAdmin, authorizeUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', authorizeUser, authorizeAdmin, createCategory);
router.put('/category/:id', authorizeUser, authorizeAdmin, updateCategory);
router.delete('/category/:id', authorizeUser, authorizeAdmin, deleteCategory);

export default router;
