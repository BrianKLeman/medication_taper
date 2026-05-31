import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LinkNoteToComponent } from './link-note-to.component';
import { FormsModule } from '@angular/forms';

describe('LinkNoteToComponent', () => {
  let component: LinkNoteToComponent;
  let fixture: ComponentFixture<LinkNoteToComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkNoteToComponent],
      imports: [MatDialogModule, FormsModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { noteIDs : [1]}
        }
      ]
    });
    fixture = TestBed.createComponent(LinkNoteToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
