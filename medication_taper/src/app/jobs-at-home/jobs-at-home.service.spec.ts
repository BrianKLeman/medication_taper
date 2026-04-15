import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JobsAtHomeService } from './jobs-at-home.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('JobsAtHomeService', () => {
  let service: JobsAtHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(JobsAtHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
