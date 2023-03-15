import {
  Component,
  OnInit,
  OnDestroy,
  DoCheck
} from '@angular/core';
import { Subscription } from 'rxjs';

import { AlbumsService } from 'src/services/albums.service';
import { AuthenticationService } from 'src/services/authentication/auth.service';
import { Album } from '../../../shared/models/album.model';

@Component({
  selector: 'app-album-list',
  templateUrl: './album_list.component.html',
  styleUrls: ['./album_list.component.scss']
})
export class AlbumListComponent
  implements OnInit, OnDestroy, DoCheck
{
  private SUBSCRIPTION!: Subscription;
  private USER_SUB!: Subscription;
  albums: Album[] = [];
  user = '';
  isFiltered = false;

  constructor(
    private albumsService: AlbumsService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.USER_SUB = this.authService.user.subscribe(
      (data) => (this.user = data.email)
    );
    this.albumsService.isFiltered = false;
    this.isFiltered = false;
  }

  ngDoCheck(): void {
    if (this.albumsService.isFiltered) {
      this.isFiltered = true;
      this.albums = this.albumsService.getAlbums();

      this.albums = this.albums.filter(
        (album) => album.createdBy === this.user
      );
    } else {
      this.isFiltered = false;

      this.albums = this.albumsService.getAlbums();
      this.SUBSCRIPTION =
        this.albumsService.albumsChanged.subscribe(
          (albums: Album[]) => {
            this.albums = albums;
          }
        );
    }
  }

  ngOnDestroy(): void {
    this.SUBSCRIPTION.unsubscribe();
    this.USER_SUB.unsubscribe();
  }
}
