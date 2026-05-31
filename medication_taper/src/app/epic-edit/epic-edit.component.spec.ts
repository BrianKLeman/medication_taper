import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicEditComponent } from './epic-edit.component';
import { FormsModule } from '@angular/forms';

describe('EpicEditComponent', () => {
  let component: EpicEditComponent;
  let fixture: ComponentFixture<EpicEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpicEditComponent],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(EpicEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
