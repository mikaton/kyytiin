import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatNavList, MatDrawer, MatSidenav } from '@angular/material';
import { SocialUser } from 'angularx-social-login';
import { AuthService } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { MediaMatcher } from '@angular/cdk/layout';
import { LocalAuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  sidenav: any;
  isOpen: any;
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
    this.checkLoggedInStatus();
    try {
      await this.getUser();
    } catch(err) {
      console.log('App.component ngOnInit failed: ' + err.stack);
    }
    
  }
  checkLoggedInStatus() {
    console.log('appmodulelogincheck')
    if(this.localAuthService.decodeToken()) {
      console.log('appmodulelogincheck_true')
      this.localStorageToken = true;
    } else {
      console.log('appmodulelogincheck_false')
      this.localStorageToken = false;
    }
  }
  sidenavOpen(sidenav) {
    sidenav.toggle();
    this.isOpen = sidenav.opened;
    const hideNav = document.getElementById('sidenav_container');
    if (!this.isOpen) {
      hideNav.style.width = '0px';
    }
    if (this.isOpen) {
      hideNav.style.width = '250px';
    }
  }
  getUser() {
    this.userService.getUser(this.localAuthService.decodeToken()).then((result) => {
      this.localUser = result;
    }).catch((err) => {
      console.error('getUser() failed, ' + err.message);
    })
  }
  signOut() {
    this.authService.signOut();
    this.localAuthService.signOut();
    this.localUser = undefined;
    this.router.navigate(['frontpage']);
  }
}
