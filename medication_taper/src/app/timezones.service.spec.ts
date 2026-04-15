import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { TimezonesService } from './timezones.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TimezonesService', () => {
  let service: TimezonesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(TimezonesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
