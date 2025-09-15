import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskScreen } from './task-screen';

describe('TaskScreen', () => {
  let component: TaskScreen;
  let fixture: ComponentFixture<TaskScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
