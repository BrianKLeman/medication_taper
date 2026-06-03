import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingBoardComponent } from './shopping-board.component';
import { MatCardModule } from '@angular/material/card';

describe('ShoppingBoardComponent', () => {
  let component: ShoppingBoardComponent;
  let fixture: ComponentFixture<ShoppingBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingBoardComponent],
      imports: [MatCardModule]
    });
    fixture = TestBed.createComponent(ShoppingBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
