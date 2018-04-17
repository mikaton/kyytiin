import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ForgotPasswordService {
  apiUrlPwReset = `${environment.apiUrl}/auth/forgot-password`;
  apiUrlPwChange = `${environment.apiUrl}/auth/change-password`;

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
  
  changePassword(newPassword: string, token: string): Promise<any> {
    let response = new Promise((resolve, reject) => {
      this.http.post(this.apiUrlPwChange, { newPassword: newPassword, token: token })
      .toPromise()
      .then(
        res => resolve(res),
        err => reject(err)
      );
    });
    return response;
  }
}
