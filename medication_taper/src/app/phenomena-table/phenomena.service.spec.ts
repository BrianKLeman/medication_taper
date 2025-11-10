import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PhenomenaService } from './phenomena.service';

describe('PhenomenaService', () => {
  let service: PhenomenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
          imports: [HttpClientTestingModule]});
    service = TestBed.inject(PhenomenaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
