import { TestBed } from '@angular/core/testing';

import { GuestHomePageGuard } from './guest-home-page.guard';

describe('GuestHomePageGuard', () => {
  let guard: GuestHomePageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuestHomePageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
