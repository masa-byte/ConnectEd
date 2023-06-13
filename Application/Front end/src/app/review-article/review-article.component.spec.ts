import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewArticleComponent } from './review-article.component';

describe('ReviewArticleComponent', () => {
  let component: ReviewArticleComponent;
  let fixture: ComponentFixture<ReviewArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
