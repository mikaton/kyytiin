import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login/src/entities/user';
import { LocalAuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import {
  NgForm,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators
} from '@angular/forms';
import { passwordMatcher } from '../../validators/password-validator';
import { emailMatcher } from '../../validators/email-validator';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { SocialLoginModule } from 'angularx-social-login/src/sociallogin.module';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent implements OnInit {
  loggedIn: boolean;
  showRegisterForm = false;
  user: SocialUser;
  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(private authService: AuthService,
    private localAuthService: LocalAuthService,
    private fb: FormBuilder) {

    this.registerForm = fb.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(80)])],
      email: this.fb.group({
        confEmail: ['', Validators.compose([Validators.required, Validators.email])],
        confirmedEmail: ['', Validators.compose([Validators.required, Validators.email])],
      }, { validator: [emailMatcher] }
      ),
      password: this.fb.group({
        pwd: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        confirmPwd: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
      }, { validator: passwordMatcher }),

      phoneNumber: ['', Validators.compose([Validators.required, Validators.minLength(9)])],
    });

    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
  }
  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.updateUser();
        this.localAuthService.authenticate(user);
      })
      .catch((err) => {
        console.error('signInWithGoogle failed: ' + err.message);
      });
  }

  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.updateUser();
        this.localAuthService.authenticate(user);
      })
      .catch((err) => {
        console.error('signInWithFB() failed: ' + err.message);
      });
  }

  signInLocalUser(loginForm) {
    this.localAuthService.signIn(loginForm)
    .catch((err) => {
      console.error('signInLocalUser() failed: ' + err.message);
    });
  }

  registerLocal(registerForm) {
    this.localAuthService.registerLocal(registerForm)
    .then((user) => {
      console.log('Registered user: ' + user);
    })
    .catch((err) => {
      console.error('registerLocal() failed: ' + err.message);
    });
  }

  async updateUser() {
    await this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signOut(): void {
    this.localAuthService.signOut();
    this.authService.signOut();
  }

  openRegisterForm() {
    if (!this.showRegisterForm) {
      this.showRegisterForm = true;
    } else {
      this.showRegisterForm = false;
    }
  }
}
