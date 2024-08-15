import { TestBed } from '@angular/core/testing';

import { PhenomenaService } from './phenomena.service';

describe('PhenomenaService', () => {
  let service: PhenomenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhenomenaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
