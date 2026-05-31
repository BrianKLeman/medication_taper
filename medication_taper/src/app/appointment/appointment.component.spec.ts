import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentComponent } from './appointment.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

describe('AppointmentComponent', () => {
  let component: AppointmentComponent;
  let fixture: ComponentFixture<AppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentComponent],
      imports: [MatDialogModule, FormsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {
                  datetime: new Date(),
                  note : null
                }}
      ]
    });
    fixture = TestBed.createComponent(AppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
