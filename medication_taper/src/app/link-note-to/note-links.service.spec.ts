import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoteLinksService } from './note-links.service';

describe('RecordsService', () => {
  let service: NoteLinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(NoteLinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
