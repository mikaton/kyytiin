import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class ReviewService {
  apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) { }

  allowReview(user, user2) {
    let response = new Promise((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/review/canReview/${user}/${user2}`)
        .toPromise()
        .then(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          })
    })
    return response;
  }
  sendReview(reviewForm) {
    let response = new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/review/${reviewForm.customer_id}`, reviewForm)
        .toPromise()
        .then(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          })
    })
    return response;
  }
  getReviews(customer_id): Promise<any> {
    let response = new Promise((resolve, reject) => {
      this.http.get(`${environment.apiUrl}/review/getReview/${customer_id}`)
        .toPromise()
        .then(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          })
    })
    return response;
  }
}
