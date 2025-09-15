// src/app/features/tasks/tasks.routes.ts
import { Routes } from '@angular/router';
import { TaskScreen } from './components/task-screen/task-screen';
// import { TaskScreenComponent } from './components/task-screen/task-screen.component';
// import { TaskFormComponent } from './modals/task-form/task-form.component';
// import { TaskEditComponent } from './modals/task-edit/task-edit.component';

export const TASKS_ROUTES: Routes = [
  {
    path: '',
    component: TaskScreen,
    // children: [
    //   {
    //     path: 'create',
    //     component: TaskFormComponent
    //   },
    //   {
    //     path: 'edit/:id',
    //     component: TaskEditComponent
    //   }
    // ]
  }
];