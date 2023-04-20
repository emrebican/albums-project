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
import { clearStorage } from 'src/tools/clearStorage';

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
      // filter for user's albums
      this.isFiltered = true;
      this.albums = this.albumsService.getAlbums();

      this.albums = this.albums.filter(
        (album) => album.createdBy === this.user
      );
    } else if (this.albumsService.searchText) {
      // filter for search input
      this.albums = this.albumsService.getAlbums();

      this.albums = this.albums.filter((album) =>
        album.title
          .toLowerCase()
          .includes(
            this.albumsService.searchText.toLowerCase().trim()
          )
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
    // Delete unnecessary images from Firebase storage
    clearStorage(this.albumsService);

    this.SUBSCRIPTION.unsubscribe();
    this.USER_SUB.unsubscribe();
  }
}
