import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../services/data_storage.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  // GEÇİÇİ **************************************************** -- Header da bir düğme ile yapılacak
  constructor(private store: DataStorageService) {}

  ngOnInit(): void {
    // this.onFetchAlbums();
  }

  onStoreAlbums() {
    this.store.storeAlbums().subscribe((responseData) => {
      console.log(responseData);
    });
  }

  onFetchAlbums() {
    this.store.fetchAlbums().subscribe(() => {
      console.log('Albums Fetched');
    });
  }
}
