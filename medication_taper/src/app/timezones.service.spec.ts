import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TimezonesService } from './timezones.service';

describe('TimezonesService', () => {
  let service: TimezonesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
          imports: [HttpClientTestingModule]});
    service = TestBed.inject(TimezonesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
