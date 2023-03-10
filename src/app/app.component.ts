import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
