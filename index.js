import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { connectDB } from './configs/db.js';
import { clientDomain, port } from './configs/variables.js';
import errorHandler from './middlewares/errorHandler.js';
import applicationRoutes from './routes/applicationRoutes.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import generalRoutes from './routes/generalRoutes.js';
import instructorRoutes from './routes/instructorRoutes.js';
import storyRoutes from './routes/storyRoutes.js';

const app = express();

app.use(
  cors({
    origin: clientDomain,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/api', generalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/faqs', faqRoutes);

app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((error) => {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.status(200).send("Welcome to DCTA's server!");
});

export default app;
