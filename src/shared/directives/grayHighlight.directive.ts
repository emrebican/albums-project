import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({ selector: '[appGrayHighlight]' })
export class GrayHighlightDirective {
  @HostBinding('class') defaultClass = 'transparent';

  constructor() {}

  @HostListener('mouseenter') mouseEnter(eventData: Event) {
    this.defaultClass = 'bg-gray-300';
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event) {
    this.defaultClass = 'transparent';
  }
}
