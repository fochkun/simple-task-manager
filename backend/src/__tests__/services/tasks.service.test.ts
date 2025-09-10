// src/__tests__/services/tasks.service.test.ts
import { TaskService } from '../../features/tasks/tasks.service';
import { TaskRepository } from '../../features/tasks/tasks.repository';
import { Task } from '../../db/entities/task';

// Мокаем TaskRepository
jest.mock('../../features/tasks/tasks.repository');

describe('TaskService', () => {
  let taskService: TaskService;
  let mockTaskRepository: jest.Mocked<TaskRepository>;

  beforeEach(() => {
    // Очищаем все моки
    jest.clearAllMocks();
    
    // Создаем мок репозитория
    mockTaskRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    } as any;

    // Мокаем конструктор TaskRepository
    (TaskRepository as jest.MockedClass<typeof TaskRepository>).mockImplementation(() => mockTaskRepository);
    
    taskService = new TaskService();
  });

  describe('getAll', () => {
    it('should return all tasks', async () => {
      const mockTasks: Task[] = [
        { id: '1', title: 'Task 1', completed: false },
        { id: '2', title: 'Task 2', completed: true },
      ];

      mockTaskRepository.findAll.mockResolvedValue(mockTasks);

      const result = await taskService.getAll();

      expect(mockTaskRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockTasks);
    });

    it('should return empty array when no tasks', async () => {
      mockTaskRepository.findAll.mockResolvedValue([]);

      const result = await taskService.getAll();

      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const title = 'New Task';
      const mockTask = { id: '1', title, completed: false };
      const mockSavedTask = { id: '1', title, completed: false };

      mockTaskRepository.create.mockReturnValue(mockTask as any);
      mockTaskRepository.save.mockResolvedValue(mockSavedTask as any);

      const result = await taskService.create(title);

      expect(mockTaskRepository.create).toHaveBeenCalledWith({ title, completed: false });
      expect(mockTaskRepository.save).toHaveBeenCalledWith(mockTask);
      expect(result).toEqual(mockSavedTask);
    });
  });

  describe('update', () => {
    it('should update task completion status', async () => {
      const id = '1';
      const completed = true;
      const mockTask = { id, title: 'Task', completed: false };
      const mockUpdatedTask = { id, title: 'Task', completed: true };

      mockTaskRepository.findById.mockResolvedValue(mockTask as any);
      mockTaskRepository.save.mockResolvedValue(mockUpdatedTask as any);

      const result = await taskService.update(id, completed);

      expect(mockTaskRepository.findById).toHaveBeenCalledWith(id);
      expect(mockTaskRepository.save).toHaveBeenCalledWith({ ...mockTask, completed });
      expect(result).toEqual(mockUpdatedTask);
    });

    it('should return null when task not found', async () => {
      const id = 'non-existent';
      const completed = true;

      mockTaskRepository.findById.mockResolvedValue(null);

      const result = await taskService.update(id, completed);

      expect(mockTaskRepository.findById).toHaveBeenCalledWith(id);
      expect(mockTaskRepository.save).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete task successfully', async () => {
      const id = '1';
      const mockDeleteResult = { affected: 1 };

      mockTaskRepository.delete.mockResolvedValue(mockDeleteResult as any);

      const result = await taskService.delete(id);

      expect(mockTaskRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toBe(true);
    });

    it('should return false when task not found', async () => {
      const id = 'non-existent';
      const mockDeleteResult = { affected: 0 };

      mockTaskRepository.delete.mockResolvedValue(mockDeleteResult as any);

      const result = await taskService.delete(id);

      expect(mockTaskRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toBe(false);
    });
  });
});
