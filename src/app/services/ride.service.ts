import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { API_URL } from '../app.config';
import { Router } from '@angular/router';

@Injectable()
export class RideService {
  apiUrl: string = `${API_URL}/ride`;
  apiUrlJoinRequest: string = `${API_URL}/ride/join/sendrequest`;
  apiUrlJoinDeny: string = `${API_URL}/ride/join/deny`;
  apiUrlJoinConfirm: string = `${API_URL}/ride/join/confirm`;
  apiUrlUser: string = `${API_URL}/ride/user`;

  constructor(private http: HttpClient, private router: Router) { }

  getRide(ride_id): Promise<any> {
    let response = new Promise((resolve, reject) => {
      this.http.get(`${this.apiUrl}/${ride_id}`)
      .toPromise()
      .then(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    })
    return response;
  }
  getUserMadeRide(ride_id, customer_id): Promise<any> {
    let response = new Promise ((resolve, reject) => {
      this.http.get(`${this.apiUrl}/${ride_id}/${customer_id}`)
      .toPromise()
      .then(
        ride => {
          resolve(ride);
        },
        err => {
          reject(err);
        }
      );
    });
    return response;

  }
  getRideToUserPage(customer_id): Promise<any> {
    let response = new Promise((resolve, reject) => {
      this.http.get(`${this.apiUrlUser}/${customer_id}`)
      .toPromise()
      .then(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    });
    return response;
  }

  getJoinedRideToUserPage(customer_id): Promise<any> {
    let response = new Promise((resolve, reject) => {
      this.http.get(`${this.apiUrlUser}/joined/${customer_id}`)
      .toPromise()
      .then(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    });
    return response;
  }

  getRides(): Promise<any> {
    let response = new Promise((resolve, reject) => {
      this.http.get(this.apiUrl)
      .toPromise()
      .then(
        data => {
          resolve(data);
        }, err => {
          reject(err);
        }
      );
    });
    return response;
  }

  postRides(ride) {
    let response = new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}`, ride)
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

  patchRide(data) {
    let response = new Promise((resolve, reject) => {
      this.http.patch(`${this.apiUrl}/${data.ride_id}`, data)
      .toPromise()
      .then(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      );
    }); 
    return response;
  }

  joinRide(ride_id, joiner_id): Promise<any> {
    let response = new Promise((resolve, reject) => {
      const data = {
        joiner_id: joiner_id
      };
      this.http.post(`${this.apiUrl}/join/${ride_id}`, data)
      .toPromise()
      .then(
        data => resolve(data),
        err => reject(err)
      );
    });
    return response;
  }

  denyJoinRide(ride_id, joiner_id): Promise<any> {
    let response = new Promise((resolve, reject) => {
      const data = {
        joiner_id: joiner_id
      };
      this.http.post(`${this.apiUrl}/deny/${ride_id}`, data)
      .toPromise()
      .then(
        data => resolve(data),
        err => reject(err)
      );
    });
    return response;
  }
}
