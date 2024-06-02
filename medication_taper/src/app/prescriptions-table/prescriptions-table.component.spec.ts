import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionsTableComponent } from './prescriptions-table.component';

describe('PrescriptionsTableComponent', () => {
  let component: PrescriptionsTableComponent;
  let fixture: ComponentFixture<PrescriptionsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrescriptionsTableComponent]
    });
    fixture = TestBed.createComponent(PrescriptionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
