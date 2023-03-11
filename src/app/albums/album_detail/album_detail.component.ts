import {
  Component,
  DoCheck,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AlbumsService } from 'src/services/albums.service';
import { AuthenticationService } from 'src/services/authentication/auth.service';
import { DataStorageService } from 'src/services/data_storage.service';

import { Comment } from 'src/shared/models/comment.model';
import { Album } from '../../../shared/models/album.model';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-album_detail',
  templateUrl: './album_detail.component.html',
  styleUrls: ['./album_detail.component.scss']
})
export class AlbumDetailComponent
  implements OnInit, DoCheck, OnDestroy
{
  albumDetail!: Album;
  user = '';
  id!: number;

  content = '';
  isCommentOK = false;
  commentMode: boolean = false;
  isCommentable: boolean = false;
  SUBSCRIPTION!: Subscription;

  // Icons
  faCancel = faTimesCircle;
  faDeleteComment = faTimes;
  faDelete = faTrashAlt;
  faEdit = faEdit;
  faPlus = faPlusSquare;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumsService: AlbumsService,
    private dataStorageService: DataStorageService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.SUBSCRIPTION = this.authService.user.subscribe(
      (userData) => {
        this.user = userData.email;
      }
    );

    this.route.params.subscribe((params: Params) => {
      this.id = Number(params['id']);
      this.albumDetail = this.albumsService.getAlbum(
        +params['id']
      );
      this.commentMode = false;
      this.isCommentable = false;
    });
    console.log(this.albumDetail);
    console.log(this.user);
  }

  ngDoCheck(): void {
    if (this.albumDetail.comments.length === 0) {
      this.isCommentable = true;
    } else {
      this.isCommentable = this.albumDetail.comments.every(
        (commentData) => commentData.author !== this.user
      );
    }

    if (this.content !== '' && this.content.trim()) {
      this.isCommentOK = true;
    } else {
      this.isCommentOK = false;
    }
  }

  ngOnDestroy(): void {
    this.SUBSCRIPTION.unsubscribe();
  }

  onEditAlbum() {
    this.router.navigate(['../', this.id, 'edit'], {
      relativeTo: this.route,
      fragment: `Editing_${this.id}`
    });
  }

  onDeleteAlbum() {
    this.albumsService.deleteAlbum(this.id);
    this.dataStorageService.storeAlbums().subscribe();
  }

  onAddComment() {
    this.content !== '' && this.content.trim()
      ? this.albumDetail.comments.push(
          new Comment(this.user, this.content)
        )
      : null;

    this.dataStorageService
      .storeAlbums()
      .subscribe((responseData) => {
        this.commentMode = false;
      });
  }

  onDeleteComment(index: number) {
    if (this.albumDetail.comments[index].author === this.user) {
      this.albumDetail.comments.splice(index, 1);

      this.content = '';
      this.dataStorageService.storeAlbums().subscribe();
    }
  }

  onCloseDetail() {
    this.router.navigate(['/albums'], {
      relativeTo: this.route
    });
  }

  onCommentMode() {
    this.commentMode = true;
  }
}
