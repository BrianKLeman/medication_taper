import { TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SleepsService } from './sleeps.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SleepsService', () => {
  let service: SleepsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(SleepsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
