import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PhenomenaService } from './phenomena.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PhenomenaService', () => {
  let service: PhenomenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(PhenomenaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
