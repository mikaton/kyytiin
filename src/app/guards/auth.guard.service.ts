import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token')) {   // TODO: checkkaa onko tokeni validi
      return true;
    }
    this.router.navigate(['/register'], { queryParams: { returnUrl: state.url}}) // TODO: MessageService virheviesteille tai 401, 404 ja 500 virhesivut joihin redirect
    
    return false;
  }
}
