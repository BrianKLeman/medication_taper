import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepsFormComponent } from './sleeps-form.component';

describe('SleepsFormComponent', () => {
  let component: SleepsFormComponent;
  let fixture: ComponentFixture<SleepsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SleepsFormComponent]
    });
    fixture = TestBed.createComponent(SleepsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
