import { Component, ChangeDetectorRef, OnInit, isDevMode } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatNavList, MatDrawer, MatSidenav } from '@angular/material';
import { SocialUser } from 'angularx-social-login';
import { AuthService } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { MediaMatcher } from '@angular/cdk/layout';
import { LocalAuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { JoinRequestService } from './services/joinrequest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isOpen: boolean = true;
  localUser: any;
  user: SocialUser;
  loggedIn: boolean;
  mobileQuery: MediaQueryList;
  currentUserId: any;
  localStorageToken: boolean;
  private _mobileQueryListener: () => void;

  constructor(private authService: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private localAuthService: LocalAuthService,
    private userService: UserService,
    private requestService: JoinRequestService,
    private router: Router) {

    this.mobileQuery = media.matchMedia('(max-width: 1279px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    //Tarpeellinen, kaikki rikki jos poissa. 
    this.localAuthService.checkLocalStorage$.subscribe(
      () => {
        this.checkLoggedInStatus();
      }
    );
  }

  async ngOnInit() {
    await Promise.all([this.checkLoggedInStatus(), this.sidenav()])
  }

  checkLoggedInStatus() {
    if (this.localAuthService.decodeToken()) {
      this.localStorageToken = true;
    } else {
      this.localStorageToken = false;
    }
  }
  sidenav() {
    const hideNav = document.getElementById('mob_bar');
    const rotateArrow = document.getElementById('arrow');
    if(this.isOpen) {
      hideNav.style.display = 'none';
      rotateArrow.style.transform ="rotate(180deg)"
      this.isOpen = false;
    } else {
      hideNav.style.display = 'flex';
      rotateArrow.style.transform ="rotate(0deg)"
      this.isOpen = true;
    }
  }
  getUser() {
    this.userService.getUser(this.localAuthService.decodeToken()).then((result) => {
      this.localUser = result;
    }).catch((err) => {
      console.error('getUser() failed, ' + err.message);
    })
  }
  toFrontPage() {
    this.router.navigate(['/frontpage'])
  }
  signOut() {
    this.authService.signOut();
    this.localAuthService.signOut();
    this.localUser = undefined;
    this.router.navigate(['frontpage']);
  }
}
