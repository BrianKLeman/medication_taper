import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FeaturesService } from './features.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('FeaturesService', () => {
  let service: FeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(FeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
