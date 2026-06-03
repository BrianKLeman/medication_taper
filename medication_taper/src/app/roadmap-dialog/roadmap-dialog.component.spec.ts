import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapDialogComponent } from './roadmap-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { RoadmapEditComponent } from '../roadmap-edit/roadmap-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('RoadmapDialogComponent', () => {
  let component: RoadmapDialogComponent;
  let fixture: ComponentFixture<RoadmapDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoadmapDialogComponent, RoadmapEditComponent],
      imports: [MatDialogModule, ReactiveFormsModule],
      providers:[
        {
          provide: MAT_DIALOG_DATA,
          useValue:{
            datetime: new Date(Date.now()),
                  roadmap : null,
                  projectId : 1
          }
        }
      ]
    });
    fixture = TestBed.createComponent(RoadmapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
