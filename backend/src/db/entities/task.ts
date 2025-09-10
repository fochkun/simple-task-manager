import { Entity, PrimaryColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Task {
  @PrimaryColumn('uuid')
  id: string = uuidv4(); // генерируем при создании

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'boolean', default: false })
  completed!: boolean;
}