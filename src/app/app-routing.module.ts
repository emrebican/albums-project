import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlbumsComponent } from './albums/albums.component';
import { AlbumFormComponent } from './albums/album_form/album_form.component';
import { AlbumDetailComponent } from './albums/album_detail/album_detail.component';
import { NotFoundComponent } from './not_found/not_found.component';

import { AlbumResolver } from '../services/albumsResolver.resolver';
import { CanDeactivateGuard } from 'src/services/can-deactivate.guard';
import { AuthenticationComponent } from './auth/auth.component';
import { AuthGuard } from 'src/services/authentication/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  {
    path: 'albums',
    component: AlbumsComponent,
    // canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],

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
  { path: 'auth', component: AuthenticationComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: { message: 'Page is not found!' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
