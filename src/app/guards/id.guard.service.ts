// Käytetään reitteihin johon vain tiety(i)llä henkilö(i)llä on pääsy
// Esimerkiksi Ridejoinconfirm/jne
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { LocalAuthService } from '../services/auth.service';

export class IdGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: LocalAuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    // expectedId annetaan routen path{} -konfiguraatiossa erillisessä dataobjektissa
    const expectedId = route.data.expectedId;
    // Haetaan localstoragesta nykyinen id
    const currentId = this.authService.decodeToken();
    // Jos Id ei mätsää reitin odotettuun idhen, ei päästetä ko. käyttäjää reittiin
    if(!expectedId === currentId) {
      return false;
    }
    return true;
  }
}