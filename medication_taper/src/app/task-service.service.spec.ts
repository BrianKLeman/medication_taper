import { TestBed } from '@angular/core/testing';

import { TaskServiceService } from './task-form/task-service.service';

describe('TaskServiceService', () => {
  let service: TaskServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
