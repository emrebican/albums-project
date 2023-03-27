import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { getStorage, ref, deleteObject } from 'firebase/storage';

import { Album } from '../shared/models/album.model';

@Injectable({ providedIn: 'root' })
export class AlbumsService {
  albumsChanged = new Subject<Album[]>();
  albums: Album[] = [];
  isFiltered = false;
  searchText = '';
  currentId!: number;

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
    const albumImageUrl = this.albums[albumIndex].imageURL;

    this.albums[albumIndex] = updatedAlbum;
    this.albumsChanged.next(this.albums.slice());
  }

  deleteAlbum(index: number) {
    const albumIndex = this.getIndex(index);
    const albumImageUrl = this.albums[albumIndex].imageURL;

    if (
      confirm('Are you sure that you want to delete this Album?')
    ) {
      this.albums.splice(albumIndex, 1);
      this.albumsChanged.next(this.albums.slice());

      // Delete AlbumImage from Firebase Storage
      this.deleteAlbumImage(albumImageUrl);

      this.router.navigate(['/albums'], {
        relativeTo: this.route
      });
    }
  }

  // for AlbumDetail
  getAlbum(index: number) {
    const albumIndex = this.getIndex(index);

    return this.albums[albumIndex];
  }

  deleteAlbumImage(url: string) {
    const storage = getStorage();
    const albumRef = ref(storage, url);

    deleteObject(albumRef)
      .then(() => {
        console.log('Album Deleted');
      })
      .catch((error) => console.log(error));
  }

  private getIndex(index: number) {
    return this.albums.findIndex((album) => {
      return album.id === index;
    });
  }
}
