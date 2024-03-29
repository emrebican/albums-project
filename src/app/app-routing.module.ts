import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from 'src/services/can-deactivate.guard';

import { AlbumFormComponent } from './albums/album_form/album_form.component';
import { NotFoundComponent } from './not_found/not_found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  {
    path: 'albums',
    title: 'Home',
    loadChildren: () =>
      import('./albums/albums.module').then(
        (m) => m.AlbumsModule
      )
  },
  {
    path: 'new-album',
    title: 'New Album',
    component: AlbumFormComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'auth',
    title: 'Authentication',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule)
  },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
  {
    path: 'not-found',
    title: '404 Page',
    component: NotFoundComponent,
    data: { message: 'Page is not found!' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
