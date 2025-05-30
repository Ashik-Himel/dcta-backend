import express from 'express';
import multer from 'multer';
import {
  createCourse,
  deleteCourse,
  getCourses,
  getPopularCourses,
  slugCheck,
  updateCourse,
} from '../controllers/courseController.js';
import { authorizeAdmin, authorizeUser } from '../middlewares/authMiddleware.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get('/', getCourses);
router.get('/popular', getPopularCourses);
router.post('/', authorizeUser, authorizeAdmin, upload.single('thumbnail'), createCourse);
router.put('/course/:id', authorizeUser, authorizeAdmin, upload.single('thumbnail'), updateCourse);
router.delete('/course/:id', authorizeUser, authorizeAdmin, deleteCourse);
router.get('/slug/:slug', slugCheck);

export default router;
