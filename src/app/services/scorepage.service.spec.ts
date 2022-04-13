import { TestBed } from '@angular/core/testing';

import { ScorepageService } from './scorepage.service';

describe('ScorepageService', () => {
  let service: ScorepageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScorepageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
