import { TestBed } from '@angular/core/testing';

import { NoteLinksService } from './note-links.service';

describe('RecordsService', () => {
  let service: NoteLinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteLinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
