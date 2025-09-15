import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import {} from '@taiga-ui/kit';

@Component({
  selector: 'app-task-create',
  imports: [TuiButton,
    TuiTextfield,
    FormsModule],
  templateUrl: './task-create.html',
  styleUrl: './task-create.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCreate {

  taskTitle = '';

  constructor(
    // private taskService: TaskService,
    private router: Router
  ) {}

  onClose() {
    this.router.navigate(['/tasks']);
  }

  onSubmit() {
    if (!this.taskTitle.trim()) return;

    // this.taskService.createTask({ title: this.taskTitle }).subscribe({
    //   next: () => {
    //     this.router.navigate(['/tasks']);
    //   },
    //   error: (err: Error) => {
    //     console.error('Ошибка при создании задачи', err);
    //     // Здесь можно добавить toast с ошибкой — позже
    //   }
    // });
  }
}
