import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicEditComponent } from './epic-edit.component';

describe('EpicEditComponent', () => {
  let component: EpicEditComponent;
  let fixture: ComponentFixture<EpicEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpicEditComponent]
    });
    fixture = TestBed.createComponent(EpicEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
