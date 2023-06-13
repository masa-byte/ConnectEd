import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnHoverDirectiveDirective } from './on-hover-directive.directive';

@NgModule({
  declarations: [OnHoverDirectiveDirective],
  imports: [CommonModule],
  exports: [OnHoverDirectiveDirective],
})
export class DirectivesModule { }
