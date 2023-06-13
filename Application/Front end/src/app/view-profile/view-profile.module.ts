import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProfileComponent } from './view-profile.component';
import { MainPageModule } from '../main-page/main-page.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { DisplayArticlesModule } from '../display-articles/display-articles.module';
import { MatCardModule } from '@angular/material/card';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [ViewProfileComponent],
  imports: [
    CommonModule,
    MainPageModule,
    MatGridListModule,
    DisplayArticlesModule,
    MatCardModule,
    DirectivesModule,
  ],
  exports: [ViewProfileComponent],
})
export class ViewProfileModule {}
