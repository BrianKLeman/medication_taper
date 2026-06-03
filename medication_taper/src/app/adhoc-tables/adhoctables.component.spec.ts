import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocTablesComponent } from './adhoctables.component';
import { NotesTableComponent } from '../notes-table/notes-table.component';
import { MatExpansionModule } from '@angular/material/expansion';

describe('AdhocTablesComponent', () => {
  let component: AdhocTablesComponent;
  let fixture: ComponentFixture<AdhocTablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdhocTablesComponent, NotesTableComponent],
      imports: [MatExpansionModule]
    });
    fixture = TestBed.createComponent(AdhocTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
