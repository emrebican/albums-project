import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AlbumsService } from 'src/app/services/albums.service';
import { DataStorageService } from 'src/app/services/data_storage.service';

import { Comment } from 'src/shared/comment.model';
import { Album } from '../album.model';

@Component({
  selector: 'app-album_detail',
  templateUrl: './album_detail.component.html',
  styleUrls: ['./album_detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {
  @ViewChild('contentInput') content!: ElementRef;
  albumDetail!: Album;
  id!: number;
  commentMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumsService: AlbumsService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params['id']);
      this.albumDetail = this.albumsService.getAlbum(+params['id']);
    });
  }

  onEditAlbum() {
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onAddComment() {
    this.albumDetail.comments.push(
      new Comment('Emre', this.content.nativeElement.value)
    );

    this.dataStorageService.storeAlbums().subscribe((responseData) => {
      console.log(responseData);
      this.commentMode = false;
      this.router.navigate(['/albums'], { relativeTo: this.route });
    });
  }

  onCommentMode() {
    this.commentMode = true;
  }
}
