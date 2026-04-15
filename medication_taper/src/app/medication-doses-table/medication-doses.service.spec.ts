import { TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MedicationDosesService } from './medication-doses.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MedicationDosesService', () => {
  let service: MedicationDosesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(MedicationDosesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
