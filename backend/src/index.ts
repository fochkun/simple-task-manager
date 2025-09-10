import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './db/ormconfig';
import tasksRoutes from './features/tasks/tasks.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', tasksRoutes);

// Initialize database and start server
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });