import { TestBed } from '@angular/core/testing';

import { ItemsdetailService } from './itemsdetail.service';

describe('ItemsdetailService', () => {
  let service: ItemsdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
