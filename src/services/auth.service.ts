import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { RidelistComponent } from '../app/components/ridelist/ridelist.component';
import { AuthDialogComponent } from '../app/components/auth-dialog/auth-dialog.component';
import { Subject } from 'rxjs/Subject';
import { API_URL } from '../app/app.config';

@Injectable()
export class LocalAuthService {
    apiUrlSocial = `${API_URL}/auth/social`;
    apiUrlLocalLogin = `${API_URL}/auth/local/login`;
    apiUrlLocalRegister = `${API_URL}/auth/local/register`;
    constructor(private http: HttpClient, private router: Router) { }

    authenticate(user) {
        let response = new Promise((resolve, reject) => {
            if (user) {
                this.http.post(this.apiUrlSocial, user)
                    .toPromise()
                    .then(
                        res => {
                            this.setToken(res);
                            this.setCurrentUserId(res);
                            this.checkLocalStorageToken();
                            this.router.navigate(['rides']);
                            resolve(res);
                        },
                        err => {
                            reject(err);
                        }
                    );   
            }
        });
        return response;
    }
    signIn(user) {
        let response = new Promise((resolve, reject) => {
            this.http.post(this.apiUrlLocalLogin, user)
            .toPromise()
            .then(
                res => {
                    this.setToken(res);
                    this.setCurrentUserId(res);
                    this.checkLocalStorageToken();
                    this.router.navigate(['rides']);
                    resolve();
                },
                err => {
                    reject(err);
                }
            );
        });
        return response;
    }
    registerLocal(user) {
        let response = new Promise((resolve, reject) => {
            this.http.post(this.apiUrlLocalRegister, user)
            .toPromise()
            .then(
                res => {
                    this.setToken(res);
                    this.signOut();
                    this.router.navigate(['frontpage']);
                    resolve(res);
                },
                err => {
                    reject(err);
                }
            );
        });
        return response;
    }
    setCurrentUserId(res) {
        localStorage.setItem('_id', res._id);
    }
    private setToken(res) {
        localStorage.setItem('token', res.token);
    }
    signOut() {
        localStorage.removeItem('_id');
        localStorage.removeItem('token');
        this.checkLocalStorageToken();
        this.router.navigate(['frontpage']);
    }

    // app.componentin log in statuksen näyttäminen
    private checkLocalStorage = new Subject<any>();
    checkLocalStorage$ = this.checkLocalStorage.asObservable();

    checkLocalStorageToken() {
        this.checkLocalStorage.next();
      }
    
}
