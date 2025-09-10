// src/features/tasks/dto/update-task.dto.ts
import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTaskDto {
  @IsBoolean({ message: 'Completed must be a boolean' })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
  })
  completed!: boolean;
}
