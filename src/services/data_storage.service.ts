import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { AlbumsService } from './albums.service';

import { Album } from '../shared/models/album.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private albumsService: AlbumsService
  ) {}

  storeAlbums() {
    const albums = this.albumsService.getAlbums();

    return this.http.put(environment.FIRE_BASE, albums);
  }

  fetchAlbums() {
    return this.http.get<Album[]>(environment.FIRE_BASE).pipe(
      map((albums) => {
        return albums.map((album) => {
          return {
            ...album,
            comments: album.comments ? album.comments : [],
            reactions: album.reactions
              ? album.reactions
              : {
                  users: [],
                  reacts: { thumb: 0, like: 0 }
                }
          };
        });
      }),
      tap((albumsData) => {
        this.albumsService.setAlbums(albumsData);
      })
    );
  }
}
