import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhocTablesComponent } from './adhoctables.component';

describe('BeatchartsComponent', () => {
  let component: AdhocTablesComponent;
  let fixture: ComponentFixture<AdhocTablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdhocTablesComponent]
    });
    fixture = TestBed.createComponent(AdhocTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
