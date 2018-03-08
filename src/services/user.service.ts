import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { AuthService } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { API_URL } from '../app/app.config'

@Injectable()
export class UserService {
  user: SocialUser;
  apiUrl = `${API_URL}`;

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getUser(user): Promise<object> {
      return this.http.get(`${API_URL}/${user}`)
        .toPromise()
        .then(response => {
          return Promise.resolve(response);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
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
