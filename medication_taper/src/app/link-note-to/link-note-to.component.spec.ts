import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkNoteToComponent } from './link-note-to.component';

describe('LinkNoteToComponent', () => {
  let component: LinkNoteToComponent;
  let fixture: ComponentFixture<LinkNoteToComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkNoteToComponent]
    });
    fixture = TestBed.createComponent(LinkNoteToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
