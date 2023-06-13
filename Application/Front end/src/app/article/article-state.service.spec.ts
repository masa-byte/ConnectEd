import { TestBed } from '@angular/core/testing';

import { ArticleStateService } from './article-state.service';

describe('ArticleStateService', () => {
  let service: ArticleStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
