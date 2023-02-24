import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumListComponent } from './albums/album_list/album_list.component';
import { AlbumItemComponent } from './albums/album_list/album_item/album_item.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumListComponent,
    AlbumItemComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
