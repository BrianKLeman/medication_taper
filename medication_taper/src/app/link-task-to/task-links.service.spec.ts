import { TestBed } from '@angular/core/testing';

import { TaskLinksService } from './task-links.service';

describe('TaskLinksService', () => {
  let service: TaskLinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskLinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
