import { TestBed } from '@angular/core/testing';

import { AlcoholServiceService } from './alcohol-service.service';

describe('AlcoholServiceService', () => {
  let service: AlcoholServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlcoholServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
