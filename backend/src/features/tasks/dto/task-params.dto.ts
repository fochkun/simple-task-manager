// src/features/tasks/dto/task-params.dto.ts
import { IsUUID, IsNotEmpty } from 'class-validator';

export class TaskParamsDto {
  @IsNotEmpty({ message: 'ID is required' })
  @IsUUID(4, { message: 'Invalid ID format' })
  id!: string;
}
