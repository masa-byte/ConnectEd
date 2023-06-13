import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundCanvasComponent } from './background-canvas.component';

@NgModule({
  declarations: [BackgroundCanvasComponent],
  imports: [CommonModule],
  exports: [BackgroundCanvasComponent],
})
export class BackgroundCanvasModule { }
