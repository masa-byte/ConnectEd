import { TestBed } from '@angular/core/testing';

import { FacultyMemberService } from './faculty-member.service';

describe('FacultyMemberService', () => {
  let service: FacultyMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultyMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
