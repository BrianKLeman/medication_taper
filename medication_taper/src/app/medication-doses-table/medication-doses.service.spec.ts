import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MedicationDosesService } from './medication-doses.service';

describe('MedicationDosesService', () => {
  let service: MedicationDosesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
          imports: [HttpClientTestingModule]
        });
    service = TestBed.inject(MedicationDosesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
