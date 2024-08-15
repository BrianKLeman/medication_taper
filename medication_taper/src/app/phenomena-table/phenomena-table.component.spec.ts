import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhenomenaTableComponent } from './phenomena-table.component';

describe('PhenomenaTableComponent', () => {
  let component: PhenomenaTableComponent;
  let fixture: ComponentFixture<PhenomenaTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhenomenaTableComponent]
    });
    fixture = TestBed.createComponent(PhenomenaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
