import {
  Component,
  DoCheck,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AlbumsService } from 'src/services/albums.service';
import { AuthenticationService } from 'src/services/authentication/auth.service';
import { DataStorageService } from 'src/services/data_storage.service';

import { Album } from '../../../../shared/models/album.model';

import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as faThumbsUpActive } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartActive } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faComment as faCommentActive } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-album_item',
  templateUrl: './album_item.component.html',
  styleUrls: ['./album_item.component.scss']
})
export class AlbumItemComponent
  implements OnInit, OnDestroy, DoCheck
{
  @Input('album') album!: Album;
  @Input() index!: number;
  SUBSCRIPTION!: Subscription;

  selectedAlbum!: Album;
  currentUser = '';
  currentId!: number;

  isThumb = false;
  isLike = false;
  isComment = false;

  faThumbsUp = faThumbsUp;
  faHeart = faHeart;
  faComment = faComment;
  faThumbsUpActive = faThumbsUpActive;
  faHeartActive = faHeartActive;
  faCommentActive = faCommentActive;
  faDelete = faTrash;
  faEdit = faEdit;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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

    this.activeIcon();
  }

  ngDoCheck(): void {
    this.activeIcon();
  }

  ngOnDestroy(): void {
    this.SUBSCRIPTION.unsubscribe();
  }

  onDeleteAlbum() {
    this.albumsService.deleteAlbum(this.index);
    this.onStore();
  }

  onEditAlbum() {
    this.router.navigate([this.index, 'edit'], {
      relativeTo: this.route,
      fragment: `Editing_${this.index}`
    });
  }

  addThumb() {
    if (this.currentUser) {
      this.addIconCount(this.index, 'thumb');
      this.onStore();
    } else {
      this.router.navigate(['/auth'], {
        relativeTo: this.route
      });
    }
  }

  addLike() {
    if (this.currentUser) {
      this.addIconCount(this.index, 'like');
      this.onStore();
    } else {
      this.router.navigate(['/auth'], {
        relativeTo: this.route
      });
    }
  }

  onSendId(id: number) {
    this.currentId = this.albumsService.currentId;

    if (this.currentId !== id) {
      this.onScrollTop();
    }
  }

  private onScrollTop() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 8);
  }

  private activeIcon() {
    // isThumb
    this.album.reactions.users.includes(
      this.currentUser + 'thumb'
    )
      ? (this.isThumb = true)
      : (this.isThumb = false);

    // isLike
    this.album.reactions.users.includes(
      this.currentUser + 'like'
    )
      ? (this.isLike = true)
      : (this.isLike = false);

    // isComment
    this.album.comments.some(
      (comment) => comment.author === this.currentUser
    )
      ? (this.isComment = true)
      : (this.isComment = false);
  }

  private onStore() {
    this.dataStorageService.storeAlbums().subscribe();
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
}
