import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { UserCredentialsService } from './user-credentials.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UserCredentialsService', () => {
  let service: UserCredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(UserCredentialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
