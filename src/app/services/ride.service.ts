import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class RideService {
  apiUrl: string = `${environment.apiUrl}/ride`;
  apiUrlJoinRequest: string = `${environment.apiUrl}/ride/join/sendrequest`;
  apiUrlJoinDeny: string = `${environment.apiUrl}/ride/join/deny`;
  apiUrlJoinConfirm: string = `${environment.apiUrl}/ride/join/confirm`;
  apiUrlUser: string = `${environment.apiUrl}/ride/user`;

  constructor(private http: HttpClient, private router: Router) { }

  getDirections(startingplace, destination): Promise<any> {
    // Hakee matkan ajo-ohjeet Googlen APIsta
    let response = new Promise((resolve, reject) => {
      this.http.get(`${this.apiUrl}/directions/${startingplace}/${destination}`)
      .toPromise()
      .then(
        data => resolve(data),
        err => reject(err)
      );
    });

    return response;
  }

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
  deleteRide(ride_id): Promise<any> {
    let response = new Promise((resolve, reject) => {
      this.http.delete(`${this.apiUrl}/${ride_id}`)
      .toPromise()
      .then(
        data => resolve(data),
        err => reject(err)
      );
    });
    return response;
  }
  getUserMadeRide(ride_id, customer_id): Promise<any> {
    console.log(ride_id)
    console.log(customer_id)
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
