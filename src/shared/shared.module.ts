import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './directives/placeholder.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { GrayHighlightDirective } from './directives/grayHighlight.directive';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    GrayHighlightDirective,
    HighlightDirective
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    FontAwesomeModule,
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    GrayHighlightDirective,
    HighlightDirective
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule {}
