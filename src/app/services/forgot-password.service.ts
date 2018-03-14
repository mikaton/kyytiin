import { Injectable } from '@angular/core';
import { API_URL } from '../app.config';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ForgotPasswordService {
  apiUrlPwReset = `${API_URL}/auth/forgot-password`
  constructor(private http: HttpClient) { }

  sendResetLink(email: string): Promise<any> {
    let response = new Promise((resolve, reject) => {
      this.http.post(this.apiUrlPwReset, email)
      .toPromise()
      .then(
        res => resolve(res),
        err => reject(err)
      );
    });
    return response;
  }
  
}
