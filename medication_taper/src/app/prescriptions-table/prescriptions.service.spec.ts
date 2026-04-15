import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { PrescriptionsService } from './prescriptions.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PrescriptionsService', () => {
  let service: PrescriptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(PrescriptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
