import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicDialogComponent } from './epic-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

describe('EpicDialogComponent', () => {
  let component: EpicDialogComponent;
  let fixture: ComponentFixture<EpicDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatDialogModule],
      providers: [
        { 
          
          provide: MAT_DIALOG_DATA,
          useValue: {
              datetime: new Date(Date.now()),
              epic : null,
              projectId : 1
            }
          }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
