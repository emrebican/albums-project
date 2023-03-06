import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs';

import { AuthenticationService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      // Attaching the token
      take(1),
      exhaustMap((user) => {
        // if there is no user
        if (!user) {
          return next.handle(req);
        }

        // if we have a user
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
          headers: new HttpHeaders({
            Authentication: 'Approved'
          })
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
