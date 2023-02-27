import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumListComponent } from './albums/album_list/album_list.component';
import { AlbumItemComponent } from './albums/album_list/album_item/album_item.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlbumFormComponent } from './albums/album_form/album_form.component';
import { AlbumDetailComponent } from './albums/album_detail/album_detail.component';
import { LoadingSpinnerComponent } from 'src/shared/loading-spinner/loading-spinner.component';
import { NavbarComponent } from './navbar/navbar.component';

import { HighlightDirective } from 'src/shared/highlight.directive';
import { DropdownDirective } from 'src/shared/dropdown.directive';
import { CanDeactivateGuard } from 'src/services/can-deactivate.guard';
import { GrayHighlightDirective } from 'src/shared/grayHighlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumListComponent,
    AlbumItemComponent,
    AlbumFormComponent,
    AlbumDetailComponent,
    LoadingSpinnerComponent,
    NavbarComponent,
    HighlightDirective,
    GrayHighlightDirective,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
