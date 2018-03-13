import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.getItem('token')) {   // TODO: checkkaa onko tokeni validi
      return true;
    } else {
      window.alert('Kirjaudu sisään nähdäksesi tiedot!'); // TODO: MessageService virheviesteille tai 401, 404 ja 500 virhesivut joihin redirect
    }
    return false;
  }
}
