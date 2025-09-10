// src/features/tasks/tasks.controller.ts
import { Request, Response } from 'express';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskParamsDto } from './dto/task-params.dto';

const taskService = new TaskService();

export class TaskController {
  static async getAll(req: Request, res: Response) {
    try {
      const tasks = await taskService.getAll();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const createTaskDto: CreateTaskDto = req.body;
      const task = await taskService.create(createTaskDto.title);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Create Server error', error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const taskParams = req.params as unknown as TaskParamsDto;
      const updateTaskDto: UpdateTaskDto = req.body;
      const task = await taskService.update(taskParams.id, updateTaskDto.completed);
      if (!task) return res.status(404).json({ message: 'Task not found' });

      res.json(task);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const taskParams = req.params as unknown as TaskParamsDto;
      const deleted = await taskService.delete(taskParams.id);
      if (!deleted) return res.status(404).json({ message: 'Task not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}