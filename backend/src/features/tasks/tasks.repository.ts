// src/features/tasks/tasks.repository.ts
import { Task } from '../../db/entities/task';
import { AppDataSource } from '../../db/ormconfig';

export class TaskRepository {
  private repo = AppDataSource.getRepository(Task);

  findAll() {
    return this.repo.find();
  }

  findById(id: string) {
    return this.repo.findOneBy({ id });
  }

  create(task: Partial<Task>) {
    return this.repo.create(task);
  }

  save(task: Task) {
    return this.repo.save(task);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}