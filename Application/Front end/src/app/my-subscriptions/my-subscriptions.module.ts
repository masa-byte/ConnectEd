import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySubscriptionsComponent } from './my-subscriptions.component';
import { DisplayArticlesModule } from '../display-articles/display-articles.module';
import { BackgroundCanvasModule } from '../background-canvas/background-canvas.module';

@NgModule({
  declarations: [MySubscriptionsComponent],
  imports: [CommonModule, DisplayArticlesModule, BackgroundCanvasModule],
})
export class MySubscriptionsModule { }
