import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { SearchModule } from '../search/search.module';
import { ArticleModule } from '../article/article.module';
import { DisplayArticlesComponent } from './display-articles.component';

@NgModule({
  declarations: [DisplayArticlesComponent],
  imports: [CommonModule, MatGridListModule, SearchModule, ArticleModule],
  exports: [DisplayArticlesComponent],
})
export class DisplayArticlesModule { }
