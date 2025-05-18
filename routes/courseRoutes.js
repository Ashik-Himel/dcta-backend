import express from 'express';
import {
  createCourse,
  deleteCourse,
  getCourses,
  getPopularCourses,
  updateCourse,
} from '../controllers/courseController.js';
import { authorizeAdmin, authorizeUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getCourses);
router.get('/popular', getPopularCourses);
router.post('/', authorizeUser, authorizeAdmin, createCourse);
router.put('/course/:id', authorizeUser, authorizeAdmin, updateCourse);
router.delete('/course/:id', authorizeUser, authorizeAdmin, deleteCourse);

export default router;
