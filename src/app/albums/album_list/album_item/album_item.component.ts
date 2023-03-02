import {
  Component,
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
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

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

  onDeleteAlbum() {
    if (this.currentUser) {
      this.albumsService.deleteAlbum(this.index);
      this.onStore();
      this.router.navigate(['/albums'], {
        relativeTo: this.route
      });
    } else {
      this.router.navigate(['/auth'], {
        relativeTo: this.route
      });
    }
  }

  onEditAlbum() {
    this.router.navigate([this.index, 'edit'], {
      relativeTo: this.route
    });
  }

  addThumb(index: number) {
    if (this.currentUser) {
      this.addIconCount(index, 'thumb');
      this.onStore();
    } else {
      this.router.navigate(['/auth'], {
        relativeTo: this.route
      });
    }
  }

  addLike(index: number) {
    if (this.currentUser) {
      this.addIconCount(index, 'like');
      this.onStore();
    } else {
      this.router.navigate(['/auth'], {
        relativeTo: this.route
      });
    }
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
