import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { SearchModule } from '../search/search.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { ArticleComponent } from './article.component';
import { DisplayTestModule } from '../display-test/display-test.module';
import { MatIconModule } from '@angular/material/icon';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    SearchModule,
    MatGridListModule,
    DisplayTestModule,
    MatIconModule,
    DirectivesModule,
  ],
  exports: [ArticleComponent],
})
export class ArticleModule { }
