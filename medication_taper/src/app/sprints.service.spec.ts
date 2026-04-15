import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SprintsService } from './sprints.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SprintsService', () => {
  let service: SprintsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(SprintsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
