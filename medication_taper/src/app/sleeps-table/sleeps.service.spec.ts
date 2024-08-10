import { TestBed } from '@angular/core/testing';

import { SleepsService } from './sleeps.service';

describe('SleepsService', () => {
  let service: SleepsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SleepsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
