import { TestBed } from '@angular/core/testing';

import { GuestStateService } from './guest-state.service';

describe('GuestStateService', () => {
  let service: GuestStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
