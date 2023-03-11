import {
  AfterViewInit,
  Directive,
  ElementRef
} from '@angular/core';

@Directive({ selector: '[Autofocus]' })
export class AutofocusDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }
}
