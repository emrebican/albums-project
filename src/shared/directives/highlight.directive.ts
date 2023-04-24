import {
  Directive,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  @HostBinding('class') defaultClass =
    'shadow-lg brightness-100';

  constructor() {}

  @HostListener('mouseenter') mouseEnter(eventData: Event) {
    this.defaultClass = 'shadow-xl brightness-105';
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event) {
    this.defaultClass = 'shadow-lg brightness-100';
  }
}
