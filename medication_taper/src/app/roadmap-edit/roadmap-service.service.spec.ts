import { TestBed } from '@angular/core/testing';

import { RoadmapServiceService } from './roadmap-service.service';

describe('RoadmapServiceService', () => {
  let service: RoadmapServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoadmapServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
