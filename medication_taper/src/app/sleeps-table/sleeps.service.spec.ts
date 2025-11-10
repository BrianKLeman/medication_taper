import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SleepsService } from './sleeps.service';

describe('SleepsService', () => {
  let service: SleepsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
          imports: [HttpClientTestingModule]});
    service = TestBed.inject(SleepsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
