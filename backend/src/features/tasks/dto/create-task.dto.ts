// src/features/tasks/dto/create-task.dto.ts
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTaskDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(100, { message: 'Title must be less than 100 characters' })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  title!: string;
}
