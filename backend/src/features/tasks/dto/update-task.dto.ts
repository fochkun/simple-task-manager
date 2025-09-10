// src/features/tasks/dto/update-task.dto.ts
import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTaskDto {
  @IsBoolean({ message: 'Completed must be a boolean' })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      const lowerValue = value.toLowerCase();
      if (lowerValue === 'true' || lowerValue === '1' || lowerValue === 'yes') {
        return true;
      }
      if (lowerValue === 'false' || lowerValue === '0' || lowerValue === 'no') {
        return false;
      }
      // Для других строк возвращаем false
      return false;
    }
    if (typeof value === 'number') {
      return value === 1;
    }
    return Boolean(value);
  })
  completed!: boolean;
}
