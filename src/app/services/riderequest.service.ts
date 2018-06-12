import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class RideRequestService {
  apiUrl: string = `${environment.apiUrl}/riderequests`;
  apiUrlDirections: string = `${environment.apiUrl}/ride/direcetions`;
  constructor(private http: HttpClient, private router: Router) { }

  getDirections(startingplace, destination): Promise<any> {
    // Hakee matkan ajo-ohjeet Googlen APIsta
    let response = new Promise((resolve, reject) => {
      this.http.get(`${this.apiUrlDirections}/${startingplace}/${destination}`)
      .toPromise()
      .then(
        data => resolve(data),
        err => reject(err)
      );
    });

    return response;
  }
  getRequests(): Promise<any> {
    let response = new Promise((resolve, reject) => {
      this.http.get(`${this.apiUrl}/request/`)
      .toPromise()
      .then(
        data => {
          console.log(data);
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    })
    return response;
  }

  getRequest(request_id): Promise<any> {
    let response = new Promise((resolve, reject) => {
      this.http.get(`${this.apiUrl}/request/${request_id}`)
      .toPromise()
      .then(
        data => {
          console.log(data);
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    })
    return response;
  }

  takeRequest(data): Promise<any> {
    let response = new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/takerequest`, data)
      .toPromise()
      .then(
        data => resolve(data),
        err => reject(err)
      );
    });
    return response;
  }
  postRequest(request) {
    let response = new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/request`, request)
      .toPromise()
      .then(
        data => {
          this.router.navigate(['rides']);
          resolve();
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
