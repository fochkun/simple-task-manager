// src/features/tasks/tasks.service.ts
import { TaskRepository } from './tasks.repository';

export class TaskService {
  private taskRepository = new TaskRepository();

  async getAll() {
    return this.taskRepository.findAll();
  }

  async create(title: string) {
    console.log('start create task');
    const task = this.taskRepository.create({ title, completed: false });
    console.log('start save task');
    return this.taskRepository.save(task);
  }

  async update(id: string, completed: boolean) {
    const task = await this.taskRepository.findById(id);
    if (!task) return null;
    task.completed = completed;
    return this.taskRepository.save(task);
  }

  async delete(id: string) {
    const result = await this.taskRepository.delete(id);
    return result.affected !== 0;
  }
}