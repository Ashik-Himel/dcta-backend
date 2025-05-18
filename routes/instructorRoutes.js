import express from 'express';
import {
  createInstructor,
  deleteInstructor,
  getInstructors,
  updateInstructor,
} from '../controllers/instructorController.js';
import { authorizeAdmin, authorizeUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getInstructors);
router.post('/', authorizeUser, authorizeAdmin, createInstructor);
router.put('/instructor/:id', authorizeUser, authorizeAdmin, updateInstructor);
router.delete('/instructor/:id', authorizeUser, authorizeAdmin, deleteInstructor);

export default router;
