import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicationComponent } from './add-medication.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

describe('AddMedicationComponent', () => {
  let component: AddMedicationComponent;
  let fixture: ComponentFixture<AddMedicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, FormsModule],
      declarations: [AddMedicationComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            prescriptionId: 0,
                      dose : null
          }
        }
      ]
    });
    fixture = TestBed.createComponent(AddMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
