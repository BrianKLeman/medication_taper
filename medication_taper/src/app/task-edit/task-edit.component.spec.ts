import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditComponent } from './task-edit.component';
import { NotesComponent } from '../notes/notes.component';
import { NotesTableComponent } from '../notes-table/notes-table.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TaskEditComponent', () => {
  let component: TaskEditComponent;
  let fixture: ComponentFixture<TaskEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskEditComponent, NotesTableComponent],
      imports: [MatExpansionModule, FormsModule, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(TaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
