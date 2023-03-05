import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'username' })
export class UserNamePipe implements PipeTransform {
  transform(value: any, type: string) {
    if (value.includes(type)) {
      const index = value.indexOf('@');

      return value.substring(0, index);
    }
  }
}
