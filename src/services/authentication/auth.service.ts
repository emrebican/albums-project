import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  tap,
  throwError
} from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';

import { environment } from 'src/environments/environment';
import { I_AuthResponseData } from 'src/shared/models/auth.model';
import { User } from 'src/shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user = new BehaviorSubject<any>(null);
  googleToken = new BehaviorSubject<any>(null);
  private tokenExpirationTimer: any;
  private token: any;
  private imageUrl =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';

  constructor(
    private http: HttpClient,
    private router: Router,
    private fireAuth: AngularFireAuth
  ) {}

  onSignUp(email: string, password: string) {
    return this.http
      .post<I_AuthResponseData>(
        `${environment.SIGNUP_URL}${environment.API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            this.imageUrl,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  onLogin(email: string, password: string) {
    return this.http
      .post<I_AuthResponseData>(
        `${environment.SIGNIN_URL}${environment.API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            this.imageUrl,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('albumUser');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  // autoLogin with LS
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      image: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('albumUser') || '{}');

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData.image,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);

      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();

      this.autoLogout(expirationDuration);
    }
  }

  // auto Logout
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // login with Google
  googleSignIn() {
    this.fireAuth
      .signInWithPopup(new GoogleAuthProvider())
      .then((res) => {
        // we could reach user's info except token
        // so get userToken with getIdTokenResult method
        res.user
          ?.getIdTokenResult()
          .then((resData) => {
            // save token into an Obs
            this.googleToken.next(resData.token);

            return res;
          })
          .then((res) => {
            // sub Obs and get
            this.googleToken.subscribe((resData) => {
              this.token = resData;
            });
            // user the saved token
            this.handleAuthentication(
              res.user?.email,
              res.user?.uid,
              res.user?.photoURL,
              this.token,
              3600
            );

            this.router.navigate(['/albums']);
          });
      });
  }

  // handle Authentication
  private handleAuthentication(
    email: any,
    userId: any,
    userImage: any,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );

    const user = new User(
      email,
      userId,
      userImage,
      token,
      expirationDate
    );
    this.user.next(user);

    // LS
    localStorage.setItem('albumUser', JSON.stringify(user));
  }

  // handle Error
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier!';
        break;
      case 'EMAIL_EXIST':
        errorMessage =
          'The email address is already in use by another account!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password!';
        break;
    }

    return throwError(errorMessage);
  }
}
