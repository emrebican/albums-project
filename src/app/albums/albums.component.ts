import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../services/data_storage.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 800);

    this.onFetchAlbums();
  }

  onStoreAlbums() {
    this.dataStorageService.storeAlbums().subscribe((responseData) => {
      console.log(responseData);
    });
  }

  onFetchAlbums() {
    this.dataStorageService.fetchAlbums().subscribe(() => {
      console.log('Albums Fetched');
    });
  }
}
