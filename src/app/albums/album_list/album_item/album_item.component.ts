import { Component, Input, OnInit } from '@angular/core';
import { Album } from '../../album.model';

@Component({
  selector: 'app-album_item',
  templateUrl: './album_item.component.html',
  styleUrls: ['./album_item.component.scss']
})
export class AlbumItemComponent implements OnInit {
  @Input('album') album!: Album;
  constructor() {}

  ngOnInit() {
    console.log(this.album);
  }
}
