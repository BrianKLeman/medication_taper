import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { TaskLinksService } from './task-links.service';
describe('TaskLinksService', () => {
  let service: TaskLinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TaskLinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
