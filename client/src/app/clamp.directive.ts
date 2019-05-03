import { Directive, Input, ElementRef } from '@angular/core';
import * as clampLib from 'text-overflow-clamp';

@Directive({
  selector: '[appClamp]'
})
export class ClampDirective {
  @Input('appClamp') lines: number;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    clampLib(this.el.nativeElement, this.lines);
  }
}
