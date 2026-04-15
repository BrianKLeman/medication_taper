import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoteLinksService } from './note-links.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('RecordsService', () => {
  let service: NoteLinksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(NoteLinksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
