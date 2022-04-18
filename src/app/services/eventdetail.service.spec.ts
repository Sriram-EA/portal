import { TestBed } from '@angular/core/testing';

import { EventdetailService } from './eventdetail.service';

describe('EventdetailService', () => {
  let service: EventdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
