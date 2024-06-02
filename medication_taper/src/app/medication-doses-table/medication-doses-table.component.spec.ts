import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationDosesTableComponent } from './medication-doses-table.component';

describe('MedicationDosesTableComponent', () => {
  let component: MedicationDosesTableComponent;
  let fixture: ComponentFixture<MedicationDosesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicationDosesTableComponent]
    });
    fixture = TestBed.createComponent(MedicationDosesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
