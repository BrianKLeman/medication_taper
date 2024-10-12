import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkTaskToComponent } from './link-task-to.component';

describe('LinkTaskToComponent', () => {
  let component: LinkTaskToComponent;
  let fixture: ComponentFixture<LinkTaskToComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkTaskToComponent]
    });
    fixture = TestBed.createComponent(LinkTaskToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
