import { TestBed } from '@angular/core/testing';

import { AlcoholServiceService } from './alcohol-service.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AlcoholServiceService', () => {
  let service: AlcoholServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(AlcoholServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
