import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlbumsService } from 'src/services/albums.service';
import { AuthenticationService } from 'src/services/authentication/auth.service';
import { DataStorageService } from 'src/services/data_storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  toggleMenu = false;
  toggleOptions = false;
  isAuthenticated = false;
  isStoring = false;
  isFetching = false;
  user = '';
  userImage = '';
  private AUTH_SUB!: Subscription;

  constructor(
    private authService: AuthenticationService,
    private dataStorageService: DataStorageService,
    private albumsService: AlbumsService
  ) {}

  ngOnInit() {
    this.AUTH_SUB = this.authService.user.subscribe(
      (userData) => {
        this.isAuthenticated = userData ? true : false;
        this.user = userData.email;
        this.userImage = userData.image;
      }
    );
  }

  ngOnDestroy(): void {
    this.AUTH_SUB.unsubscribe();
  }

  onToggleMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

  onToggleOptions() {
    this.toggleOptions = !this.toggleOptions;
  }

  onLogout() {
    this.authService.logout();
    this.toggleOptions = false;
  }

  onStoreAlbums() {
    this.isStoring = true;

    this.dataStorageService
      .storeAlbums()
      .subscribe((responseData) => {
        console.log(responseData);
        this.isStoring = false;
      });
  }

  onFetchAlbums() {
    this.isFetching = true;

    this.dataStorageService.fetchAlbums().subscribe(() => {
      console.log('Albums Fetched');
      this.isFetching = false;
    });
  }

  onFilteredAlbums() {
    this.albumsService.isFiltered = true;
  }

  onCancelFiltered() {
    this.albumsService.isFiltered = false;
  }
}
