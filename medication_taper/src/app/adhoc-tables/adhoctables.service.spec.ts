import { TestBed } from '@angular/core/testing';

import { AdhocTablesService } from './adhoctables.service';

describe('BeatchartsService', () => {
  let service: AdhocTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdhocTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
