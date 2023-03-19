import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlbumResolver } from 'src/services/albumsResolver.resolver';
import { AuthGuard } from 'src/services/authentication/auth.guard';
import { CanDeactivateGuard } from 'src/services/can-deactivate.guard';

import { AlbumsComponent } from './albums.component';
import { AlbumDetailComponent } from './album_detail/album_detail.component';
import { AlbumFormComponent } from './album_form/album_form.component';

const albumsRoutes: Routes = [
  {
    path: '',
    component: AlbumsComponent,
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],

    children: [
      {
        path: ':id',
        title: 'Details',
        component: AlbumDetailComponent,
        resolve: [AlbumResolver]
      },
      {
        path: ':id/edit',
        title: 'Edit',
        component: AlbumFormComponent,
        resolve: [AlbumResolver],
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(albumsRoutes)],
  exports: [RouterModule]
})
export class AlbumsRoutingModule {}
