import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { DisplayArticlesModule } from '../display-articles/display-articles.module';
import { BackgroundCanvasModule } from '../background-canvas/background-canvas.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, DisplayArticlesModule, BackgroundCanvasModule],
})
export class HomePageModule { }
