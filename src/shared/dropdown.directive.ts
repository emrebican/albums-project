import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({ selector: '[appDropdown]' })
export class DropdownDirective {
  constructor(private elRef: ElementRef) {}

  @HostBinding('class.hidden') isOpen: boolean = true;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? true
      : !this.isOpen;
  }
}
