// src/features/tasks/tasks.routes.ts
import { Router } from 'express';
import { TaskController } from './tasks.controller';
import { validateDto } from '../../middleware/validation.middleware';
import { validateParams } from '../../middleware/param-validation.middleware';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskParamsDto } from './dto/task-params.dto';

const router = Router();

// GET /api/tasks - получить все задачи
router.get('/', TaskController.getAll);

// POST /api/tasks - создать новую задачу
router.post('/', validateDto(CreateTaskDto), TaskController.create);

// PATCH /api/tasks/:id - обновить задачу
router.patch('/:id', validateParams(TaskParamsDto), validateDto(UpdateTaskDto), TaskController.update);

// DELETE /api/tasks/:id - удалить задачу
router.delete('/:id', validateParams(TaskParamsDto), TaskController.delete);

export default router;
