import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcoholTableComponent } from './alcohol-table.component';
import { MatExpansionModule } from '@angular/material/expansion';

describe('AlcoholTableComponent', () => {
  let component: AlcoholTableComponent;
  let fixture: ComponentFixture<AlcoholTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlcoholTableComponent],
      imports: [MatExpansionModule]
    });
    fixture = TestBed.createComponent(AlcoholTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
