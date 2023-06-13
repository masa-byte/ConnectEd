import { TestBed } from '@angular/core/testing';

import { SignInUpGuard } from './sign-in-up.guard';

describe('SignInUpGuard', () => {
  let guard: SignInUpGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SignInUpGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
