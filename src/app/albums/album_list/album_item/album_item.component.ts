import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Album } from '../../../../shared/models/album.model';

import { AlbumsService } from 'src/services/albums.service';
import { AuthenticationService } from 'src/services/authentication/auth.service';
import { DataStorageService } from 'src/services/data_storage.service';

import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-album_item',
  templateUrl: './album_item.component.html',
  styleUrls: ['./album_item.component.scss']
})
export class AlbumItemComponent implements OnInit, OnDestroy {
  @Input('album') album!: Album;
  @Input() index!: number;
  SUBSCRIPTION!: Subscription;

  selectedAlbum!: Album;
  currentUser = '';

  faThumbsUp = faThumbsUp;
  faHeart = faHeart;
  faComment = faComment;

  constructor(
    private albumsService: AlbumsService,
    private authService: AuthenticationService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.SUBSCRIPTION = this.authService.user.subscribe(
      (userData) => {
        this.currentUser = userData.email;
      }
    );
  }

  ngOnDestroy(): void {
    this.SUBSCRIPTION.unsubscribe();
  }

  private onStore() {
    this.dataStorageService
      .storeAlbums()
      .subscribe((resData) => {
        console.log(resData);
      });
  }

  private addIconCount(index: number, type: string) {
    this.selectedAlbum = this.albumsService.getAlbum(index);

    if (this.selectedAlbum.reactions['users']) {
      if (
        !this.selectedAlbum.reactions.users.includes(
          type === 'thumb'
            ? this.currentUser + 'thumb'
            : this.currentUser + 'like'
        )
      ) {
        this.selectedAlbum.reactions.users.push(
          type === 'thumb'
            ? this.currentUser + 'thumb'
            : this.currentUser + 'like'
        );
        type === 'thumb'
          ? this.selectedAlbum.reactions.reacts.thumb++
          : this.selectedAlbum.reactions.reacts.like++;
      } else {
        const index = this.selectedAlbum.reactions.users.indexOf(
          type === 'thumb'
            ? this.currentUser + 'thumb'
            : this.currentUser + 'like'
        );

        index > -1 &&
          this.selectedAlbum.reactions.users.splice(index, 1);

        type === 'thumb'
          ? this.selectedAlbum.reactions.reacts.thumb !== 0
            ? this.selectedAlbum.reactions.reacts.thumb--
            : this.selectedAlbum.reactions.reacts.thumb
          : this.selectedAlbum.reactions.reacts.like !== 0
          ? this.selectedAlbum.reactions.reacts.like--
          : this.selectedAlbum.reactions.reacts.like;
      }
    } else {
      this.selectedAlbum.reactions['users'] = new Array();
      this.selectedAlbum.reactions.users.push(
        type === 'thumb'
          ? this.currentUser + 'thumb'
          : this.currentUser + 'like'
      );
      type === 'thumb'
        ? this.selectedAlbum.reactions.reacts.thumb++
        : this.selectedAlbum.reactions.reacts.like++;
    }
  }

  addThumb(index: number) {
    this.addIconCount(index, 'thumb');

    this.onStore();
  }

  addLike(index: number) {
    this.addIconCount(index, 'like');

    this.onStore();
  }
}
