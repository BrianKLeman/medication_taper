import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JobsAtHomeService } from './jobs-at-home.service';

describe('JobsAtHomeService', () => {
  let service: JobsAtHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
          imports: [HttpClientTestingModule]});
    service = TestBed.inject(JobsAtHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
