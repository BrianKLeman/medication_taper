import { TestBed } from '@angular/core/testing';

import { LearningAimsService } from './learning-aims.service';

describe('LearningAimsService', () => {
  let service: LearningAimsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningAimsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
