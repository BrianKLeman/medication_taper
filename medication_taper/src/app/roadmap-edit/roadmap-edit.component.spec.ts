import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapEditComponent } from './roadmap-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('RoadmapEditComponent', () => {
  let component: RoadmapEditComponent;
  let fixture: ComponentFixture<RoadmapEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoadmapEditComponent],
      imports: [ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(RoadmapEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
