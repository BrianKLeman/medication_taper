import { TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LearningAimsService } from './learning-aims.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LearningAimsService', () => {
  let service: LearningAimsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(LearningAimsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
