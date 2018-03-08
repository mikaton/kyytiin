import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login/src/entities/user';
import { LocalAuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { NgForm, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
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
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: number;
  showRegisterForm = false;
  user: SocialUser;
  email: string;

  constructor(private authService: AuthService, private localAuthService: LocalAuthService) { }

  ngOnInit() {
  }

  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.updateUser();
        this.localAuthService.authenticate(user);
      });
  }

  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.updateUser();
        this.localAuthService.authenticate(user);
      });
  }

  signInLocalUser(loginForm: NgForm) {
    this.localAuthService.signIn(loginForm.value);
  }

  registerLocal(registerForm: NgForm) {
    this.localAuthService.registerLocal(registerForm.value);
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
