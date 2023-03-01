import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Album } from '../shared/album.model';

@Injectable({ providedIn: 'root' })
export class AlbumsService {
  albumsChanged = new Subject<Album[]>();
  private albums: Album[] = [];

  constructor() {}

  setAlbums(albums: Album[]) {
    this.albums = albums;
    this.albumsChanged.next(this.albums.slice());
    console.log(this.albums);
  }

  getAlbums() {
    return this.albums.slice();
  }

  addAlbum(newAlbum: Album) {
    this.albums.push(newAlbum);
    this.albumsChanged.next(this.albums.slice());
  }

  updateAlbum(index: number, updatedAlbum: Album) {
    this.albums[index] = updatedAlbum;
    this.albumsChanged.next(this.albums.slice());
  }

  deleteAlbum(index: number) {
    this.albums.splice(index, 1);
    this.albumsChanged.next(this.albums.slice());
  }

  // for AlbumDetail
  getAlbum(index: number) {
    return this.albums[index];
  }
}
