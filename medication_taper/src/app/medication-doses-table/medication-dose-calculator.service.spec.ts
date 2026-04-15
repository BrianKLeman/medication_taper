import { TestBed } from '@angular/core/testing';

import { MedicationDoseCalculatorService } from './medication-dose-calculator.service';

describe('MedicationDoseCalculatorService', () => {
  let service: MedicationDoseCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicationDoseCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
