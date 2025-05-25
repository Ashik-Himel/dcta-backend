import express from 'express';
import multer from 'multer';
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../controllers/categoryController.js';
import { authorizeAdmin, authorizeUser } from '../middlewares/authMiddleware.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get('/', getCategories);
router.post('/', authorizeUser, authorizeAdmin, upload.single('img'), createCategory);
router.put('/category/:id', authorizeUser, authorizeAdmin, upload.single('img'), updateCategory);
router.delete('/category/:id', authorizeUser, authorizeAdmin, deleteCategory);

export default router;
