import { TestBed } from '@angular/core/testing';

import { ProfilesSearchService } from './profiles-search.service';

describe('ProfilesSearchService', () => {
  let service: ProfilesSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilesSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
