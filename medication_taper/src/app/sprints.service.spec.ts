import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SprintsService } from './sprints.service';

describe('SprintsService', () => {
  let service: SprintsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
          imports: [HttpClientTestingModule]});
    service = TestBed.inject(SprintsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
