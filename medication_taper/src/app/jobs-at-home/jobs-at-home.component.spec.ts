import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsAtHomeComponent } from './jobs-at-home.component';

describe('JobsAtHomeComponent', () => {
  let component: JobsAtHomeComponent;
  let fixture: ComponentFixture<JobsAtHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobsAtHomeComponent]
    });
    fixture = TestBed.createComponent(JobsAtHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
