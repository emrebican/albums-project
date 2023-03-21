import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({ selector: '[appDropdown]' })
export class DropdownDirective {
  constructor(private elRef: ElementRef) {}

  @HostBinding('class') defaultClass =
    'opacity-0 pt-7 top-[-8px] rounded-full h-8 w-8 cursor-pointer';

  @HostListener('document:click', ['$event']) toggleOpen(
    event: Event
  ) {
    this.defaultClass = this.elRef.nativeElement.contains(
      event.target
    )
      ? 'opacity-100 pt-1 top-10 h-fit w-48 rounded-md'
      : 'opacity-0 pt-7 top-[-8px] rounded-full top-0 h-8 w-8 cursor-pointer';
  }
}
