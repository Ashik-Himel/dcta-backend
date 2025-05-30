import express from 'express';
import multer from 'multer';
import {
  createInstructor,
  deleteInstructor,
  getInstructors,
  updateInstructor,
} from '../controllers/instructorController.js';
import { authorizeAdmin, authorizeUser } from '../middlewares/authMiddleware.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get('/', getInstructors);
router.post('/', authorizeUser, authorizeAdmin, upload.single('photo'), createInstructor);
router.put(
  '/instructor/:id',
  authorizeUser,
  authorizeAdmin,
  upload.single('photo'),
  updateInstructor,
);
router.delete('/instructor/:id', authorizeUser, authorizeAdmin, deleteInstructor);

export default router;
