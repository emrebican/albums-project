import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlbumsService } from 'src/services/albums.service';
import { AuthenticationService } from 'src/services/authentication/auth.service';

import { Album } from '../../../shared/album.model';

@Component({
  selector: 'app-album-list',
  templateUrl: './album_list.component.html',
  styleUrls: ['./album_list.component.scss']
})
export class AlbumListComponent implements OnInit, OnDestroy {
  private SUBSCRIPTION!: Subscription;
  albums: Album[] = [];

  constructor(
    private albumsService: AlbumsService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.albums = this.albumsService.getAlbums();

    this.SUBSCRIPTION =
      this.albumsService.albumsChanged.subscribe(
        (albums: Album[]) => {
          this.albums = albums;
          console.log(this.albums);
        }
      );
  }

  ngOnDestroy(): void {
    this.SUBSCRIPTION.unsubscribe();
  }
}
