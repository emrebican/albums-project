import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlbumsComponent } from './albums/albums.component';
import { AlbumFormComponent } from './albums/album_form/album_form.component';
import { AlbumDetailComponent } from './albums/album_detail/album_detail.component';

import { AlbumResolver } from '../services/albumsResolver.resolver';
import { CanDeactivateGuard } from 'src/services/can-deactivate.guard';
import { AuthenticationComponent } from './auth/auth.component';
import { AuthGuard } from 'src/services/authentication/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  {
    path: 'albums',
    component: AlbumsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: AlbumDetailComponent,
        resolve: [AlbumResolver]
      },
      {
        path: ':id/edit',
        component: AlbumFormComponent,
        resolve: [AlbumResolver],
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
  {
    path: 'new-album',
    component: AlbumFormComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  { path: 'auth', component: AuthenticationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
