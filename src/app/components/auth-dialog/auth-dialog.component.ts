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
import { emailPattern } from '../../validators/email-validator'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { SocialLoginModule } from 'angularx-social-login/src/sociallogin.module';
import { NgClass } from '@angular/common';
import { ErrorDialog } from '../../dialogs/error-dialog';
import { VERSION, MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent implements OnInit {
  loggedIn: boolean;
  passwordFailed: boolean;
  returnUrl: string;
  showRegisterForm = false;
  user: SocialUser;
  registerForm: FormGroup;
  loginForm: FormGroup;
  errorDialogRef: MatDialogRef<ErrorDialog>

  constructor(private authService: AuthService,
    private localAuthService: LocalAuthService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
    ) {

    this.registerForm = fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      checkbox:['', Validators.requiredTrue],
      phoneNumber: ['', [Validators.pattern("^[0-9]{8,10}")]],
      email: this.fb.group({
        confEmail: ['', [Validators.required, Validators.email]],
        confirmedEmail: ['', [Validators.required, Validators.email]],
      }, { validator: [emailMatcher]}
      ), 
      password: this.fb.group({
        pwd: ['', [Validators.required, Validators.minLength(8)]],
        confirmPwd: ['', [Validators.required, Validators.minLength(8)]]
      }, { validator: passwordMatcher }),
    });

    this.loginForm = fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.passwordFailed = false;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get firstName() { return this.registerForm.get('firstName')};
  get lastName()  { return this.registerForm.get('lastName')};
  get email()     { return this.registerForm.get('email')};
  get confEmail() { return this.registerForm.get('email.confEmail')}
  get confirmedEmail() { return this.registerForm.get('email.confirmedEmail')}
  get phoneNumber() { return this.registerForm.get('phoneNumber')};
  get password()  { return this.registerForm.get('password')};
  get checkbox()  { return this.registerForm.get('checkbox')};

  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.updateUser();
        this.localAuthService.authenticate(user).then(() => this.router.navigateByUrl(this.returnUrl));
        
      })
      .catch((err) => {
        console.error('signInWithGoogle failed: ' + err.message);
      });
  }

  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.updateUser();
        this.localAuthService.authenticate(user).then(() => this.router.navigateByUrl(this.returnUrl));
      })
      .catch((err) => {
        console.error('signInWithFB() failed: ' + err.message);
      });
  }

  signInLocalUser(loginForm) {
    this.localAuthService.signIn(loginForm)
    .then((res) => this.router.navigateByUrl(this.returnUrl))
    .catch((err) => {
      this.passwordFailed = true;
      this.loginForm.patchValue({
        password: null
      })
      console.error('signInLocalUser() failed: ' + err.message);
    });
  }

  registerLocal(registerForm) {
    this.localAuthService.registerLocal(registerForm)
    .then((user) => {
      console.log('Registered user: ' + user);
      this.router.navigateByUrl(this.returnUrl);
    })
    .catch((err) => {
      this.errorDialogRef = this.dialog.open(ErrorDialog, {
        data: {
          errorMessage: 'Jotain meni pieleen',
          serverError: err.error.message
        }
      });
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
    this.router.navigate(['/frontpage']);
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
