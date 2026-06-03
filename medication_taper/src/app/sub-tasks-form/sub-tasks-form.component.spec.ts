import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTasksFormComponent } from './sub-tasks-form.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { SubTasksEditComponent } from '../sub-tasks-edit/sub-tasks-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SubTasksFormComponent', () => {
  let component: SubTasksFormComponent;
  let fixture: ComponentFixture<SubTasksFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[MatDialogModule, ReactiveFormsModule],
      declarations: [SubTasksFormComponent, SubTasksEditComponent],
      providers:[
        {
          provide: MAT_DIALOG_DATA,
          useValue: 
          {   datetime: new Date(Date.now()),
                subTask :  null,
                taskID : 0
          }
        }
      ]
    });
    fixture = TestBed.createComponent(SubTasksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
