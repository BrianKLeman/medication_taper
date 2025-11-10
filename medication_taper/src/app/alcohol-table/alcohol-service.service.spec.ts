import { TestBed } from '@angular/core/testing';

import { AlcoholServiceService } from './alcohol-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AlcoholServiceService', () => {
  let service: AlcoholServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
          imports: [HttpClientTestingModule]});
    service = TestBed.inject(AlcoholServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
