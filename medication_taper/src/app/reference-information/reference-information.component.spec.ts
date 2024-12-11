import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceInformationComponent } from './reference-information.component';

describe('ReferenceInformationComponent', () => {
  let component: ReferenceInformationComponent;
  let fixture: ComponentFixture<ReferenceInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReferenceInformationComponent]
    });
    fixture = TestBed.createComponent(ReferenceInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
