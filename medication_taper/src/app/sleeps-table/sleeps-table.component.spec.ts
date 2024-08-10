import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepsTableComponent } from './sleeps-table.component';

describe('SleepsTableComponent', () => {
  let component: SleepsTableComponent;
  let fixture: ComponentFixture<SleepsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SleepsTableComponent]
    });
    fixture = TestBed.createComponent(SleepsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
