import { TestBed } from '@angular/core/testing';

import { AdhocTablesService } from './adhoctables.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BeatchartsService', () => {
  let service: AdhocTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
          imports: [HttpClientTestingModule]});
    service = TestBed.inject(AdhocTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
