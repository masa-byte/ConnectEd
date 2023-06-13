import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeColleaguesComponent } from './grade-colleagues.component';
import { BackgroundCanvasModule } from '../background-canvas/background-canvas.module';
import { ReviewArticleModule } from '../review-article/review-article.module';
import { DisplayArticlesModule } from '../display-articles/display-articles.module';
import { ArticleComponent } from '../article/article.component';
import { ArticleModule } from '../article/article.module';

@NgModule({
  declarations: [GradeColleaguesComponent],
  imports: [
    CommonModule,
    BackgroundCanvasModule,
    ReviewArticleModule,
    ArticleModule,
  ],
})
export class GradeColleaguesModule { }
