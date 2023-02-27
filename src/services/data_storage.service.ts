import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { AlbumsService } from './albums.service';

import { Album } from '../shared/album.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private albumsService: AlbumsService) {}

  storeAlbums() {
    const albums = this.albumsService.getAlbums();

    return this.http.put(
      'https://ng-images-default-rtdb.firebaseio.com/albums.json',
      albums
    );
  }

  fetchAlbums() {
    return this.http
      .get<Album[]>('https://ng-images-default-rtdb.firebaseio.com/albums.json')
      .pipe(
        map((albums) => {
          return albums.map((album) => {
            return {
              ...album,
              comments: album.comments ? album.comments : []
            };
          });
        }),
        tap((albumsData) => {
          this.albumsService.setAlbums(albumsData);
        })
      );
  }
}
