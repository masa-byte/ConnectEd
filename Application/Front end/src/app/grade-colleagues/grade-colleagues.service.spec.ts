import { TestBed } from '@angular/core/testing';

import { GradeColleaguesService } from './grade-colleagues.service';

describe('GradeColleaguesService', () => {
  let service: GradeColleaguesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradeColleaguesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
