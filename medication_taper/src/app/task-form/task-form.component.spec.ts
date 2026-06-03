import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { NotesTableComponent } from '../notes-table/notes-table.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskFormComponent, TaskEditComponent, NotesTableComponent],
      imports: [MatDialogModule, MatExpansionModule, FormsModule, ReactiveFormsModule],
      providers:[
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            datetime: new Date(Date.now()),
                  task : null,
                  entity : '',
                  entity_id : 1,
                  epic_id : 1
          }
        }
      ]
    });
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
