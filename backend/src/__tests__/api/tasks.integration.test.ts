// src/__tests__/api/tasks.integration.test.ts
import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from '../../db/ormconfig';
import tasksRoutes from '../../features/tasks/tasks.routes';

// Создаем тестовое приложение
const createTestApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api/tasks', tasksRoutes);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      message: `Route ${req.method} ${req.originalUrl} not found`,
      availableRoutes: [
        'GET /api/tasks',
        'POST /api/tasks',
        'PATCH /api/tasks/:id',
        'DELETE /api/tasks/:id'
      ]
    });
  });

  return app;
};

describe('Tasks API Integration Tests', () => {
  let app: express.Application;
  let createdTaskId: string;

  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    app = createTestApp();
  });

  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const taskData = { title: 'Test Task' };

      const response = await request(app)
        .post('/api/tasks')
        .send(taskData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Test Task');
      expect(response.body.completed).toBe(false);

      createdTaskId = response.body.id;
    });

    it('should return 400 for empty title', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: '' })
        .expect(400);

      expect(response.body.message).toContain('Title is required');
    });

    it('should return 400 for missing title', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({})
        .expect(400);

      expect(response.body.message).toContain('Title is required');
    });

    it('should return 400 for non-string title', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: 123 })
        .expect(400);

      expect(response.body.message).toContain('Title must be a string');
    });

    it('should return 400 for title too long', async () => {
      const longTitle = 'a'.repeat(101);

      const response = await request(app)
        .post('/api/tasks')
        .send({ title: longTitle })
        .expect(400);

      expect(response.body.message).toContain('Title must be less than 100 characters');
    });

    it('should trim whitespace from title', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: '  Trimmed Task  ' })
        .expect(201);

      expect(response.body.title).toBe('Trimmed Task');
    });
  });

  describe('GET /api/tasks', () => {
    it('should return empty array when no tasks', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should return all tasks', async () => {
      // Создаем несколько задач
      await request(app).post('/api/tasks').send({ title: 'Task 1' });
      await request(app).post('/api/tasks').send({ title: 'Task 2' });

      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('completed');
    });
  });

  describe('PATCH /api/tasks/:id', () => {
    beforeEach(async () => {
      // Создаем задачу для тестов
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'Test Task for Update' });
      createdTaskId = response.body.id;
    });

    it('should update task completion status', async () => {
      const response = await request(app)
        .patch(`/api/tasks/${createdTaskId}`)
        .send({ completed: true })
        .expect(200);

      expect(response.body.completed).toBe(true);
      expect(response.body.title).toBe('Test Task for Update');
    });

    it('should handle string "true" as boolean', async () => {
      const response = await request(app)
        .patch(`/api/tasks/${createdTaskId}`)
        .send({ completed: 'true' })
        .expect(200);

      expect(response.body.completed).toBe(true);
    });

    it('should handle string "false" as boolean', async () => {
      const response = await request(app)
        .patch(`/api/tasks/${createdTaskId}`)
        .send({ completed: 'false' })
        .expect(200);

      expect(response.body.completed).toBe(false);
    });

    it('should handle number 1 as boolean true', async () => {
      const response = await request(app)
        .patch(`/api/tasks/${createdTaskId}`)
        .send({ completed: 1 })
        .expect(200);

      expect(response.body.completed).toBe(true);
    });

    it('should return 400 for invalid UUID', async () => {
      const response = await request(app)
        .patch('/api/tasks/invalid-id')
        .send({ completed: true })
        .expect(400);

      expect(response.body.message).toContain('Invalid ID format');
    });

    it('should return 404 for non-existent task', async () => {
      const fakeId = '123e4567-e89b-12d3-a456-426614174000';

      const response = await request(app)
        .patch(`/api/tasks/${fakeId}`)
        .send({ completed: true })
        .expect(404);

      expect(response.body.message).toBe('Task not found');
    });

    it('should return 400 for missing completed field', async () => {
      const response = await request(app)
        .patch(`/api/tasks/${createdTaskId}`)
        .send({})
        .expect(400);

      expect(response.body.message).toContain('Completed must be a boolean');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    beforeEach(async () => {
      // Создаем задачу для тестов
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'Task to Delete' });
      createdTaskId = response.body.id;
    });

    it('should delete task successfully', async () => {
      await request(app)
        .delete(`/api/tasks/${createdTaskId}`)
        .expect(204);

      // Проверяем, что задача удалена
      const getResponse = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(getResponse.body).toHaveLength(0);
    });

    it('should return 400 for invalid UUID', async () => {
      const response = await request(app)
        .delete('/api/tasks/invalid-id')
        .expect(400);

      expect(response.body.message).toContain('Invalid ID format');
    });

    it('should return 404 for non-existent task', async () => {
      const fakeId = '123e4567-e89b-12d3-a456-426614174000';

      const response = await request(app)
        .delete(`/api/tasks/${fakeId}`)
        .expect(404);

      expect(response.body.message).toBe('Task not found');
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/api/unknown')
        .expect(404);

      expect(response.body.message).toContain('Route GET /api/unknown not found');
      expect(response.body.availableRoutes).toContain('GET /api/tasks');
    });

    it('should return 404 for unknown methods', async () => {
      const response = await request(app)
        .patch('/api/tasks')
        .expect(404);

      expect(response.body.message).toContain('Route PATCH /api/tasks not found');
    });
  });
});
