// src/__tests__/setup.ts
import 'reflect-metadata';
import { TestDataSource } from './test-db.config';
import { Task } from '../db/entities/task';

// Настройка тестовой базы данных
beforeAll(async () => {
  if (!TestDataSource.isInitialized) {
    await TestDataSource.initialize();
  }
});

// Очистка после каждого теста
afterEach(async () => {
  // Очищаем таблицу tasks после каждого теста
  await TestDataSource.getRepository(Task).clear();
});

// Закрытие соединения после всех тестов
afterAll(async () => {
  if (TestDataSource.isInitialized) {
    await TestDataSource.destroy();
  }
});
