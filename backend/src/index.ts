import 'reflect-metadata';
import { AppDataSource } from './db/ormconfig';

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });