import {
  Component,
  DoCheck,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AlbumsService } from 'src/services/albums.service';
import { AuthenticationService } from 'src/services/authentication/auth.service';
import { DataStorageService } from 'src/services/data_storage.service';

import { Comment } from 'src/shared/comment.model';
import { Album } from '../../../shared/album.model';

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
  @ViewChild('contentInput') content!: ElementRef;
  albumDetail!: Album;
  user = '';
  id!: number;
  commentMode: boolean = false;
  isCommentable = true;
  SUBSCRIPTION!: Subscription;

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
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params['id']);
      this.albumDetail = this.albumsService.getAlbum(
        +params['id']
      );
      this.commentMode = false;
    });
    console.log(this.albumDetail);

    this.SUBSCRIPTION = this.authService.user.subscribe(
      (userData) => {
        this.user = userData.email;
      }
    );
  }

  ngDoCheck(): void {
    if (this.albumDetail.comments.length === 0) {
      this.isCommentable = true;
    } else {
      this.albumDetail.comments.filter((commentData) => {
        commentData.author === this.user
          ? (this.isCommentable = false)
          : (this.isCommentable = true);
      });
    }
    console.log(this.isCommentable);
  }

  ngOnDestroy(): void {
    this.SUBSCRIPTION.unsubscribe();
  }

  onEditAlbum() {
    this.router.navigate(['../', this.id, 'edit'], {
      relativeTo: this.route
    });
  }

  onDeleteAlbum() {
    this.albumsService.deleteAlbum(this.id);
    this.dataStorageService
      .storeAlbums()
      .subscribe((responseData) => {
        console.log(responseData);
        this.router.navigate(['/albums'], {
          relativeTo: this.route
        });
      });
  }

  onAddComment() {
    this.albumDetail.comments.push(
      new Comment(this.user, this.content.nativeElement.value)
    );

    this.dataStorageService
      .storeAlbums()
      .subscribe((responseData) => {
        this.commentMode = false;
      });
  }

  onDeleteComment(index: number) {
    if (this.albumDetail.comments[index].author === this.user) {
      this.albumDetail.comments.splice(index, 1);

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
