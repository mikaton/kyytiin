// Käytetään reitteihin johon vain tiety(i)llä henkilö(i)llä on pääsy
// Esimerkiksi Ridejoinconfirm/jne
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { LocalAuthService } from '../services/auth.service';

@Injectable()
export class IdGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: LocalAuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    // Haetaan owner_id routen parametreistä
    const expectedId = route.params.owner_id;
    // Haetaan localstoragesta nykyinen id
    const currentId = this.authService.decodeToken();
    // Jos Id ei mätsää reitin odotettuun idhen, ei päästetä ko. käyttäjää reittiin
    if(expectedId === currentId) {
      return true;
    }
    return false;
  }
}