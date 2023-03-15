import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'shorten' })
export class ShortenPipe implements PipeTransform {
  transform(value: any, limit: number) {
    const newValue = value.split(' ');

    if (newValue.length > limit) {
      // return value.substring(0, limit) + '...';
      return newValue.splice(0, limit).join(' ') + ' ...';
    }
    return value;
  }
}
