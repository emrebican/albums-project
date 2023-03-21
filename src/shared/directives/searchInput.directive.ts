import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({ selector: '[appSearchInput]' })
export class searchInputDirective {
  @HostBinding('class') defaultClass =
    'text-gray-400 w-full bg-white sm:bg-transparent sm:w-8 md:w-8 sm:hover:bg-gray-700 sm:hover:text-white';

  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event']) click(
    eventData: Event
  ) {
    this.defaultClass = this.elRef.nativeElement.contains(
      eventData.target
    )
      ? 'text-slate-800 w-full bg-white sm:w-44 md:w-60'
      : 'text-gray-400 w-full bg-white sm:bg-transparent sm:w-8 md:w-8 sm:hover:bg-gray-700 sm:hover:text-white';
  }
}
