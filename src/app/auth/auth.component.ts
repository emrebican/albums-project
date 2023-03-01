import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from 'src/services/authentication/auth.service';
import { I_AuthResponseData } from 'src/shared/auth.model';

@Component({
  selector: 'app-authentication',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthenticationComponent implements OnInit {
  authForm!: FormGroup;
  isLoginMode = true;
  user = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
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

    authObservable.subscribe((responseData) => {
      console.log(responseData);

      this.router.navigate(['/albums'], {
        relativeTo: this.route
      });
    });

    this.authForm.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
