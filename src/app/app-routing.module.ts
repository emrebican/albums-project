import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  { path: 'albums', component: AlbumsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
