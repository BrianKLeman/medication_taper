import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTasksFormComponent } from './sub-tasks-form.component';

describe('SubTasksFormComponent', () => {
  let component: SubTasksFormComponent;
  let fixture: ComponentFixture<SubTasksFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubTasksFormComponent]
    });
    fixture = TestBed.createComponent(SubTasksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
