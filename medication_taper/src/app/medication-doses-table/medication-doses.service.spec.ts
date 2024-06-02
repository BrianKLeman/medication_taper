import { TestBed } from '@angular/core/testing';

import { MedicationDosesService } from './medication-doses.service';

describe('MedicationDosesService', () => {
  let service: MedicationDosesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicationDosesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
