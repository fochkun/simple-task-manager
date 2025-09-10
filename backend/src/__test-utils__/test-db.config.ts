// src/__tests__/test-db.config.ts
import { join } from 'path';
import { DataSource } from 'typeorm';
// import { Task } from '../db/entities/task';

export const TestDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'tasktracker',
  synchronize: true, // Для тестов используем synchronize
  logging: false, // Отключаем логирование в тестах
  entities: [join(__dirname, '..','db', 'entities', '**', '*.{ts,js}')],
  migrations: [],
  subscribers: [],
});
