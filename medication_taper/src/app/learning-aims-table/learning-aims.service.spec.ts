import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LearningAimsService } from './learning-aims.service';

describe('LearningAimsService', () => {
  let service: LearningAimsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
          imports: [HttpClientTestingModule]});
    service = TestBed.inject(LearningAimsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
