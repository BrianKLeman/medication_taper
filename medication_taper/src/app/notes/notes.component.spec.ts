import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponent } from './notes.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[MatDialogModule, FormsModule],
      declarations: [NotesComponent],
      providers: [{
        provide: MAT_DIALOG_DATA,
        useValue: {          
                    datetime: new Date(Date.now()),
                    note : null,
                    entity : "PROJECT",
                    entity_id : 0
        }
      }]
    });
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
