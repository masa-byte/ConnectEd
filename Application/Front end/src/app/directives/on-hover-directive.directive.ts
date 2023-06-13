import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { interval, takeWhile } from 'rxjs';

@Directive({
  selector: '[appOnHoverDirective]',
})
export class OnHoverDirectiveDirective {
  @Input() hoverTextColor: string = '';
  @Input() underline: boolean = false;
  @Input() bold: boolean = false;

  private defaultColor: string;

  constructor(private elementRef: ElementRef) {
    this.defaultColor = this.elementRef.nativeElement.style.color;
  }

  @HostBinding('style.text-decoration') textDecoration: string = '';
  @HostBinding('style.color') color: string = '';
  @HostBinding('style.font-weight') fontWeight: string = '';

  @HostListener('mouseenter') onMouseEnter() {
    if (this.hoverTextColor != '') this.color = this.hoverTextColor;
    if (this.underline) this.textDecoration = 'underline';
    if (this.bold) this.fontWeight = 'bold';
  }

  @HostListener('click') onClick() {
    if (this.hoverTextColor != '') this.color = this.hoverTextColor;
    if (this.underline) this.textDecoration = 'underline';
    if (this.bold) this.fontWeight = 'bold';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.color = this.defaultColor;
    this.textDecoration = '';
    this.fontWeight = '';
  }
}
