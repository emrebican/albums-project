import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  toggleMenu: boolean = false;
  toggleOptions: boolean = false;
  options: string[] = ['store album', 'fetch album', 'log out'];

  constructor() {}

  ngOnInit() {}

  onToggleMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

  onToggleOptions() {
    this.toggleOptions = !this.toggleOptions;
  }
}
