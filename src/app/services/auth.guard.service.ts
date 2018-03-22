import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService  } from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwt: JwtHelperService) {}

  canActivate() {
    if (this.jwt.decodeToken(localStorage.getItem('token'))) {   // TODO: checkkaa onko tokeni validi
      return true;
    } else {
      window.alert('Kirjaudu sisään nähdäksesi tiedot!'); // TODO: MessageService virheviesteille tai 401, 404 ja 500 virhesivut joihin redirect
    }
    return false;
  }
}
