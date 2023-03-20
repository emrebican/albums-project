import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { DynamicComponentService } from 'src/services/dynamic-component.service';
import { AuthenticationService } from 'src/services/authentication/auth.service';

import { PlaceholderDirective } from 'src/shared/directives/placeholder.directive';
import { I_AuthResponseData } from 'src/shared/models/auth.model';

@Component({
  selector: 'app-authentication',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthenticationComponent implements OnInit {
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost!: PlaceholderDirective;

  authForm!: FormGroup;
  isLoginMode = true;
  user = null;
  error = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private dynamicComponentService: DynamicComponentService
  ) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(7)
      ])
    });
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObservable: Observable<I_AuthResponseData>;

    if (this.isLoginMode) {
      authObservable = this.authService.onLogin(email, password);
    } else {
      authObservable = this.authService.onSignUp(
        email,
        password
      );
    }

    authObservable.subscribe(
      (responseData) => {
        this.error = null;

        this.router.navigate(['/albums'], {
          relativeTo: this.route
        });
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.dynamicComponentService.showDynamicComponent(
          errorMessage,
          this.alertHost,
          'error'
        );
      }
    );

    this.authForm.reset();
  }

  onGoogleAuth() {
    this.authService.googleSignIn();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleClose() {
    this.error = null;
  }
}
