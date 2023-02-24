import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { AlbumsService } from './albums.service';

import { Album } from '../albums/album.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private albumsService: AlbumsService) {}

  storeAlbums() {
    const albums: Album[] = [
      new Album(
        'Album_1',
        'Album_1 Descriptions',
        'https://somuchfoodblog.com/wp-content/uploads/2019/02/c43ac-porkschnitzel1-e1587916004737-scaled.jpg',
        ['comment_1', 'comment_2']
      ),
      new Album(
        'Album_2',
        'Album_2 Descriptions',
        'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Cheeseburger-3d7c922.jpg',
        ['comment_1', 'comment_2']
      )
    ];

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
