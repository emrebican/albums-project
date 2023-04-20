import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'tr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(
      browserLang?.match(/en|tr/) ? browserLang : 'en'
    );
  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
