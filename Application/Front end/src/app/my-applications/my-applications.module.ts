import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MyApplicationsComponent } from './my-applications.component';
import { ArticleModule } from '../article/article.module';
import { DisplayArticlesModule } from '../display-articles/display-articles.module';
import { SearchModule } from '../search/search.module';
import { BackgroundCanvasModule } from '../background-canvas/background-canvas.module';

@NgModule({
  declarations: [MyApplicationsComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    SearchModule,
    DisplayArticlesModule,
    ArticleModule,
    BackgroundCanvasModule,
  ],
})
export class MyApplicationsModule { }
