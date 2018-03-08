import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { API_URL } from '../app/app.config';
import { Router } from '@angular/router';

@Injectable()
export class RideService {
  apiUrl: string = `${API_URL}/ride`;
  apiUrlJoin: string = `${API_URL}/ride/join`;
  apiUrlUser: string = `${API_URL}/ride/user`;
  constructor(private http: HttpClient, private router: Router) { }

  getRide(ride_id): Promise<any> {
    return this.http.get(`${this.apiUrl}/${ride_id}`)
      .toPromise()
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  }
  getRideToUserPage(customer_id): Promise<any> {
    return this.http.get(`${this.apiUrlUser}/${customer_id}`)
      .toPromise()
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  }

  getRides(): Promise<any> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  }
  postRides(ride) {
    this.http.post(`${this.apiUrl}`, ride)
      .toPromise()
      .then((res) => {
        this.router.navigate(['rides']);
        Promise.resolve(res);
      })
      .catch((err) => {
        Promise.reject(err);
      });
  }
  joinRide(ride) {
    this.http.post(`${this.apiUrlJoin}`, ride)
      .toPromise()
      .then((res) => {
        this.router.navigate(['rides']);
      })
      .catch((err) => Promise.reject(err));
  }
  patchRide(data) {
    this.http.patch(`${this.apiUrl}/${data.ride_id}`, data)
      .toPromise()
      .then((res) => {
        Promise.resolve(res);
      })
      .catch((err) => Promise.reject(err));
  }
}
