// src/app/features/tasks/tasks.routes.ts
import { Routes } from '@angular/router';
import { TaskScreen } from './components/task-screen/task-screen';
import { TaskCreate } from './modals/task-create/task-create';
import { tuiGenerateDialogableRoute } from '@taiga-ui/kit/components/routable-dialog';
import { TaskEdit } from './modals/task-edit/task-edit';
// import { TaskScreenComponent } from './components/task-screen/task-screen.component';
// import { TaskFormComponent } from './modals/task-form/task-form.component';
// import { TaskEditComponent } from './modals/task-edit/task-edit.component';

export const TASKS_ROUTES: Routes = [
  {
    path: '',
    component: TaskScreen,
    children: [
      tuiGenerateDialogableRoute(TaskCreate, {
        path: 'create'
      }),
      tuiGenerateDialogableRoute(TaskEdit, {
        path: 'edit'
      })
      // {
      //   path: 'create',
      //   component: TaskCreate
      // },
    //   {
    //     path: 'edit/:id',
    //     component: TaskEditComponent
    //   }
    ]
  }
];