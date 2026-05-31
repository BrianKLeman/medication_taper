import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepsFormComponent } from './sleeps-form.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

describe('SleepsFormComponent', () => {
  let component: SleepsFormComponent;
  let fixture: ComponentFixture<SleepsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SleepsFormComponent],
      imports: [MatDialogModule, FormsModule],
      providers: [ {
        provide: MAT_DIALOG_DATA,
        useValue: {
                  datetime: new Date(),
                  sleep : null
                }
      }]
    });
    fixture = TestBed.createComponent(SleepsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
