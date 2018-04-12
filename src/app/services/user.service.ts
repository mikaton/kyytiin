import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { AuthService } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { API_URL } from '../app.config'
import { LocalAuthService } from '../services/auth.service';

@Injectable()
export class UserService {
  user: SocialUser;
  apiUrl = `${API_URL}`;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private localAuthService: LocalAuthService) { }

  getUser(user): Promise<any> {
    let response = new Promise((resolve, reject) => {
      this.http.get(`${API_URL}/user/${user}`)
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
  getMultipleUsers(...data) {
    console.log(data);
  }
  patchUserData(data) {
    let response = new Promise((resolve, reject) => {
      this.http.patch(`${API_URL}/user/${this.localAuthService.decodeToken()}`, data)
        .toPromise()
        .then(
          data => {
            resolve(data);
          },
          err => {
            reject(data);
          })
    });
    return response;
  }


  getSocialUser() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (!user) {
        return false;
      }
      return this.user;
    });
  }
}
