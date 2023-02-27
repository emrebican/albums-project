import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlbumsComponent } from './albums/albums.component';
import { AlbumFormComponent } from './albums/album_form/album_form.component';
import { AlbumDetailComponent } from './albums/album_detail/album_detail.component';
import { AlbumResolver } from '../services/albumsResolver.resolver';

const appRoutes: Routes = [
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  {
    path: 'albums',
    component: AlbumsComponent,
    children: [
      {
        path: ':id',
        component: AlbumDetailComponent,
        resolve: [AlbumResolver]
      },
      {
        path: ':id/edit',
        component: AlbumFormComponent,
        resolve: [AlbumResolver]
      }
    ]
  },
  { path: 'new-album', component: AlbumFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
