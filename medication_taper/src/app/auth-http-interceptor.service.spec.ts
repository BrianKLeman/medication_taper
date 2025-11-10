import { TestBed } from '@angular/core/testing';

import { AuthHttpInterceptorService } from './auth-http-interceptor.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthHttpInterceptorService', () => {
  let service: AuthHttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
          imports: [HttpClientTestingModule]});
    service = TestBed.inject(AuthHttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
