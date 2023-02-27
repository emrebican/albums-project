import { Component, Input, OnInit } from '@angular/core';
import { Album } from '../../../../shared/album.model';

@Component({
  selector: 'app-album_item',
  templateUrl: './album_item.component.html',
  styleUrls: ['./album_item.component.scss']
})
export class AlbumItemComponent implements OnInit {
  @Input('album') album!: Album;
  @Input() index!: number;

  constructor() {}

  ngOnInit() {}
}
