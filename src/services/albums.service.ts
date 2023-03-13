import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Album } from '../shared/models/album.model';

@Injectable({ providedIn: 'root' })
export class AlbumsService {
  albumsChanged = new Subject<Album[]>();
  private albums: Album[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
    const albumIndex = this.getIndex(index);
    this.albums[albumIndex] = updatedAlbum;

    this.albumsChanged.next(this.albums.slice());
  }

  deleteAlbum(index: number) {
    if (confirm('Are you sure that you want to delete?')) {
      const albumIndex = this.getIndex(index);

      this.albums.splice(albumIndex, 1);
      this.albumsChanged.next(this.albums.slice());

      this.router.navigate(['/albums'], {
        relativeTo: this.route
      });
    }
  }

  // for AlbumDetail
  getAlbum(index: number) {
    /* const albumIndex: number = this.albums.findIndex((album) => {
      return album.id === index;
    }); */
    const albumIndex = this.getIndex(index);

    return this.albums[albumIndex];
  }

  private getIndex(index: number) {
    return this.albums.findIndex((album) => {
      return album.id === index;
    });
  }
}
