import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';

import { AlbumsService } from './albums.service';
import { DataStorageService } from './data_storage.service';
import { Album } from '../../shared/album.model';

@Injectable({ providedIn: 'root' })
export class AlbumResolver implements Resolve<Album[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private albumsService: AlbumsService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const albums = this.albumsService.getAlbums();

    if (albums.length === 0) {
      return this.dataStorageService.fetchAlbums();
    } else {
      return albums;
    }
  }
}
