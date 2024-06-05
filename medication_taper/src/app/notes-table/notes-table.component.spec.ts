import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesTableComponent } from './notes-table.component';

describe('NotesTableComponent', () => {
  let component: NotesTableComponent;
  let fixture: ComponentFixture<NotesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesTableComponent]
    });
    fixture = TestBed.createComponent(NotesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
