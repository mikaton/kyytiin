import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { API_URL } from '../app.config'

@Injectable()
export class ReviewService {
  apiUrl = `${API_URL}`;
  constructor(private http: HttpClient) { }

  allowReview(user, user2) {
    console.log(user, user2);
    let response = new Promise((resolve, reject) => {
      this.http.get(`${API_URL}/review/canReview/${user}/${user2}`)
      .toPromise()
      .then(
        data => {
          resolve(data);
        },
        err => {
          reject(err);
        }
      )
    })
    return response;
  }
}

