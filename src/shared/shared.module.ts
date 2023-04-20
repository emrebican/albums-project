import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { AlertComponent } from './alert/alert.component';
import { ShowImageComponent } from './show-image/show-image.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './directives/placeholder.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { GrayHighlightDirective } from './directives/grayHighlight.directive';
import { HighlightDirective } from './directives/highlight.directive';
import { AutofocusDirective } from './directives/autofocus.directive';
import { searchInputDirective } from './directives/searchInput.directive';
import { UserNamePipe } from './pipes/userName.pipe';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    ShowImageComponent,
    PlaceholderDirective,
    DropdownDirective,
    GrayHighlightDirective,
    HighlightDirective,
    AutofocusDirective,
    searchInputDirective,
    UserNamePipe,
    ShortenPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    TranslateModule,
    AlertComponent,
    LoadingSpinnerComponent,
    ShowImageComponent,
    PlaceholderDirective,
    DropdownDirective,
    GrayHighlightDirective,
    HighlightDirective,
    AutofocusDirective,
    searchInputDirective,
    UserNamePipe,
    ShortenPipe
  ],
  entryComponents: [AlertComponent, ShowImageComponent]
})
export class SharedModule {}
