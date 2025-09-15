import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiSelect } from '@taiga-ui/kit';

@Component({
  selector: 'app-task-edit',
  imports: [
    TuiButton,
    // TuiIconButton,
    TuiTextfield,
    TuiSelect,
    FormsModule,
    CommonModule
  ],
  templateUrl: './task-edit.html',
  styleUrl: './task-edit.less'
})
export class TaskEdit {

  taskTitle = '';
  taskStatus: 'TODO' | 'IN_PROGRESS' | 'DONE' = 'TODO';
  taskId = '';
  isSaving = false;

  statuses = ['TODO', 'IN_PROGRESS', 'DONE'] as const;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('id') || '';
    if (this.taskId) {
      // this.taskService.getTaskById(this.taskId).subscribe(task => {
      //   this.taskTitle = task.title;
      //   this.taskStatus = task.status;
      // });
    }
  }

  onClose() {
    this.router.navigate(['/tasks']);
  }

  onSubmit() {
    if (!this.taskTitle.trim()) return;

    this.isSaving = true;

    // this.taskService.updateTask(this.taskId, {
    //   title: this.taskTitle,
    //   status: this.taskStatus
    // }).subscribe({
    //   next: () => {
    //     this.router.navigate(['/tasks']);
    //   },
    //   error: (err) => {
    //     console.error('Ошибка при обновлении задачи', err);
    //     this.isSaving = false;
    //     // Здесь можно добавить toast с ошибкой — позже
    //   }
    // });
  }
}
