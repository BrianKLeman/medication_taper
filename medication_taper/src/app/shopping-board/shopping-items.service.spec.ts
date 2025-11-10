import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShoppingItemsService } from './shopping-items.service';

describe('MockDataService', () => {
  let service: ShoppingItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
          imports: [HttpClientTestingModule]});
    service = TestBed.inject(ShoppingItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
