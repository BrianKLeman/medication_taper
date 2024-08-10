import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningAimsTableComponent } from './learning-aims-table.component';

describe('LearningAimsTableComponent', () => {
  let component: LearningAimsTableComponent;
  let fixture: ComponentFixture<LearningAimsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearningAimsTableComponent]
    });
    fixture = TestBed.createComponent(LearningAimsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
