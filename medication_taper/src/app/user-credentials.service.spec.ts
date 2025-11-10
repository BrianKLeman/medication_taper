import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserCredentialsService } from './user-credentials.service';

describe('UserCredentialsService', () => {
  let service: UserCredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
          imports: [HttpClientTestingModule]});
    service = TestBed.inject(UserCredentialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
