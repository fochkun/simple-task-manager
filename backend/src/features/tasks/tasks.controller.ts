// src/features/tasks/tasks.controller.ts
import { Request, Response } from 'express';
import { TaskService } from './tasks.service';

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
      const { title } = req.body;
      if (!title) return res.status(400).json({ message: 'Title is required' });

      const task = await taskService.create(title);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { completed } = req.body;

      if (typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'completed must be boolean' });
      }

      const task = await taskService.update(id, completed);
      if (!task) return res.status(404).json({ message: 'Task not found' });

      res.json(task);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await taskService.delete(id);
      if (!deleted) return res.status(404).json({ message: 'Task not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}