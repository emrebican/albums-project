import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AlbumsService } from 'src/app/services/albums.service';
import { Album } from '../album.model';

@Component({
  selector: 'app-album_detail',
  templateUrl: './album_detail.component.html',
  styleUrls: ['./album_detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {
  albumDetail!: Album;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumsService: AlbumsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params['id']);
      this.albumDetail = this.albumsService.getAlbum(+params['id']);

      console.log(this.albumDetail);
    });
  }
}
