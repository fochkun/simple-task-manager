import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-task-screen',
  imports: [TuiButton, RouterLink, RouterOutlet],
  standalone: true,
  templateUrl: './task-screen.html',
  styleUrl: './task-screen.less'
})
export class TaskScreen {

  constructor(private router: Router) {

  }

  onAddTask() {
    this.router.navigate(['/tasks/create']);
  }

}
