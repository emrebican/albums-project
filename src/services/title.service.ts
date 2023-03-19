import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  RouterStateSnapshot,
  TitleStrategy
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TitleService extends TitleStrategy {
  constructor(private title: Title) {
    super();
  }

  updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);

    if (title === 'Details') {
      const index = snapshot.url.indexOf('#');
      const url = snapshot.url.slice(8, index);

      this.title.setTitle(`${title} - ${url}`);
    } else if (title === 'Edit') {
      const index = snapshot.url.indexOf('#');
      const url = snapshot.url.slice(8, index - 5);

      this.title.setTitle(`${title} - ${url}`);
    } else {
      this.title.setTitle(`Albums - ${title}`);
    }
  }
}
