import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Album } from '../albums/album.model';

@Injectable({ providedIn: 'root' })
export class AlbumsService {
  albumsChanged = new Subject<Album[]>();
  private albums: Album[] = [];

  constructor() {}

  setAlbums(albums: Album[]) {
    this.albums = albums;
    this.albumsChanged.next(this.albums.slice());
  }

  getAlbums() {
    return this.albums.slice();
  }

  addAlbum(newAlbum: Album) {
    this.albums.push(newAlbum);
    this.albumsChanged.next(this.albums.slice());
  }
}
