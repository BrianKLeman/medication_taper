import { TestBed } from '@angular/core/testing';

import { RoadmapService } from './roadmap-service.service';

describe('RoadmapService', () => {
  let service: RoadmapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoadmapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
