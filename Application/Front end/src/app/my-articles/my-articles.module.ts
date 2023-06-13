import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyArticlesComponent } from './my-articles.component';
import { ArticleModule } from 'src/app/article/article.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { SearchModule } from 'src/app/search/search.module';
import { DisplayArticlesModule } from 'src/app/display-articles/display-articles.module';
import { BackgroundCanvasModule } from '../background-canvas/background-canvas.module';

@NgModule({
  declarations: [MyArticlesComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    SearchModule,
    DisplayArticlesModule,
    ArticleModule,
    BackgroundCanvasModule,
  ],
})
export class MyArticlesModule { }
