import {
  Component,
  DoCheck,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AlbumsService } from 'src/services/albums.service';
import { AuthenticationService } from 'src/services/authentication/auth.service';
import { DataStorageService } from 'src/services/data_storage.service';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent
  implements OnInit, OnDestroy, DoCheck
{
  toggleMenu = false;
  isAuthenticated = false;
  isStoring = false;
  isFetching = false;
  user = '';
  userImage = '';
  searchText = '';
  private AUTH_SUB!: Subscription;

  // icons
  searchIcon = faSearch;

  constructor(
    private authService: AuthenticationService,
    private dataStorageService: DataStorageService,
    private albumsService: AlbumsService,
    private router: Router
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

  ngDoCheck(): void {
    this.searchText
      ? (this.albumsService.searchText = this.searchText)
      : (this.albumsService.searchText = '');
  }

  ngOnDestroy(): void {
    this.AUTH_SUB.unsubscribe();
  }

  onToggleMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

  onLogout() {
    this.authService.logout();
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
    this.searchText = '';
    this.router.navigate(['/albums']);
  }

  onCancelFiltered() {
    this.albumsService.isFiltered = false;
    this.searchText = '';
  }
}
