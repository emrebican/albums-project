import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { TitleStrategy } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core.module';
import { SharedModule } from 'src/shared/shared.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not_found/not_found.component';
import { TitleService } from 'src/services/title.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    { provide: TitleStrategy, useClass: TitleService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
