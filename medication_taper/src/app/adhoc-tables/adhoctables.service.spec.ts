import { TestBed } from '@angular/core/testing';

import { AdhocTablesService } from './adhoctables.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BeatchartsService', () => {
  let service: AdhocTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(AdhocTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
