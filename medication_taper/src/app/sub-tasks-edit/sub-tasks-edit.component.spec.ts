import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTasksEditComponent } from './sub-tasks-edit.component';

describe('SubTasksEditComponent', () => {
  let component: SubTasksEditComponent;
  let fixture: ComponentFixture<SubTasksEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubTasksEditComponent]
    });
    fixture = TestBed.createComponent(SubTasksEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
