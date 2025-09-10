// src/features/tasks/tasks.routes.ts
import { Router } from 'express';
import { TaskController } from './tasks.controller';

const router = Router();

// GET /api/tasks - получить все задачи
router.get('/', TaskController.getAll);

// POST /api/tasks - создать новую задачу
router.post('/', TaskController.create);

// PUT /api/tasks/:id - обновить задачу
router.put('/:id', TaskController.update);

// DELETE /api/tasks/:id - удалить задачу
router.delete('/:id', TaskController.delete);

export default router;
