import {
  Component,
  OnInit,
  OnDestroy,
  DoCheck
} from '@angular/core';
import { Subscription } from 'rxjs';
import { getStorage, ref, listAll } from 'firebase/storage';

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

    this.clearStorage();
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
    this.SUBSCRIPTION.unsubscribe();
    this.USER_SUB.unsubscribe();
  }

  // Delete unnecessary images from Firebase storage
  clearStorage() {
    const storage = getStorage();
    const listRef = ref(storage, 'albumImages');
    const firstTerm = '%';
    const lastTerm = '?';

    const array1: string[] = [];
    const array2: string[] = [];

    this.albumsService.albums.forEach((album) => {
      let storeImagePath = '';
      const firstItem = album.imageURL.indexOf(firstTerm);
      const lastItem = album.imageURL.indexOf(lastTerm);

      if (firstItem !== -1) {
        storeImagePath =
          'albumImages/' +
          album.imageURL.slice(firstItem + 3, lastItem);
      }
      array1.push(storeImagePath);
    });

    listAll(listRef).then((res) => {
      res.items.forEach((item) => {
        array2.push(item.fullPath);
      });
    });

    setTimeout(() => {
      array2.forEach((item) => {
        const inter = array1.includes(item);

        if (!inter) {
          this.albumsService.deleteAlbumImage(item);
        }
      });
    }, 1000);
  }
}
