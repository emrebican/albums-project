import { NgModule } from '@angular/core';

import { SharedModule } from 'src/shared/shared.module';
import { AlbumsRoutingModule } from './albums-routing.module';

import { AlbumsComponent } from './albums.component';
import { AlbumDetailComponent } from './album_detail/album_detail.component';
import { AlbumFormComponent } from './album_form/album_form.component';
import { AlbumItemComponent } from './album_list/album_item/album_item.component';
import { AlbumListComponent } from './album_list/album_list.component';

@NgModule({
  declarations: [
    AlbumsComponent,
    AlbumListComponent,
    AlbumItemComponent,
    AlbumFormComponent,
    AlbumDetailComponent
  ],
  imports: [SharedModule, AlbumsRoutingModule]
})
export class AlbumsModule {}
