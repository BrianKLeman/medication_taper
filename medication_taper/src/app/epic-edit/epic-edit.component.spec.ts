import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicEditComponent } from './epic-edit.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('EpicEditComponent', () => {
  let component: EpicEditComponent;
  let fixture: ComponentFixture<EpicEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpicEditComponent],
      imports: [FormsModule, ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(EpicEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
