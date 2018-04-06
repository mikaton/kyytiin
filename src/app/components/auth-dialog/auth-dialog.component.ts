import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login/src/entities/user';
import { LocalAuthService } from '../../services/auth.service';
import { ErrorUiService } from '../../services/error-ui.service';
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
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent implements OnInit {
  loggedIn: boolean;
  loggedInLocal: boolean;
  passwordFailed: boolean;
  emailFailed: boolean;
  returnUrl: string;
  showRegisterForm = false;
  user: SocialUser;
  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(private authService: AuthService,
    private localAuthService: LocalAuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private errorUiService: ErrorUiService
  ) {

    this.registerForm = fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      checkbox: ['', Validators.requiredTrue],
      phoneNumber: ['', [Validators.pattern("^[0-9]{8,10}")]],
      email: this.fb.group({
        confEmail: ['', [Validators.required, Validators.email]],
        confirmedEmail: ['', [Validators.required, Validators.email]],
      }, { validator: [emailMatcher] }
      ),
      password: this.fb.group({
        pwd: ['', [Validators.required, Validators.minLength(8)]],
        confirmPwd: ['', [Validators.required, Validators.minLength(8)]]
      }, { validator: passwordMatcher }),
    });

    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.checkLoggedInStatus();
    this.passwordFailed = false;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  checkLoggedInStatus() {
    if (this.localAuthService.decodeToken()) {
      this.loggedInLocal = true;
    } else {
      this.loggedInLocal = false;
    }
  }
  get firstName() { return this.registerForm.get('firstName') };
  get lastName() { return this.registerForm.get('lastName') };
  get email() { return this.registerForm.get('email') };
  get confEmail() { return this.registerForm.get('email.confEmail') }
  get confirmedEmail() { return this.registerForm.get('email.confirmedEmail') }
  get phoneNumber() { return this.registerForm.get('phoneNumber') };
  get password() { return this.registerForm.get('password') };
  get checkbox() { return this.registerForm.get('checkbox') };

  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.updateUser();
        this.localAuthService.authenticate(user).then(() => window.location.reload());

      })
      .catch((err) => {
        this.errorUiService.popErrorDialog(err);
        console.error('signInWithGoogle failed: ' + err.message);
      });
  }

  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.updateUser();
        this.localAuthService.authenticate(user).then(() => window.location.reload());
      })
      .catch((err) => {
        this.errorUiService.popErrorDialog(err);
        console.error('signInWithFB() failed: ' + err.message);
      });
  }

  signInLocalUser(loginForm) {
    this.localAuthService.signIn(loginForm)
      .then(() => window.location.reload())
      .catch((err) => {
        // Jos tunnusta ei ole vahvistettu
        if(err.status === 403) {
          this.errorUiService.popErrorDialog(err);
            }
        // Jos salasana on väärin
        if(err.status === 401) {
          this.passwordFailed = true;
          this.loginForm.patchValue({
            password: null
          });
        }
        // Jos käyttäjätunnusta ei löytynyt
        if(err.status === 404) {
          this.emailFailed = true;
          this.loginForm.patchValue({
            email: null
          });
        }
        
        console.error('signInLocalUser() failed: ' + err.message);
      });
  }

  registerLocal(registerForm) {
    this.localAuthService.registerLocal(registerForm)
      .then((user) => {
        this.router.navigate(['/register-success']);
      })
      .catch((err) => {
        this.errorUiService.popErrorDialog(err);
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
    this.checkLoggedInStatus()
  }

  openRegisterForm() {
    if (!this.showRegisterForm) {
      this.showRegisterForm = true;
    } else {
      this.showRegisterForm = false;
    }
  }
}
