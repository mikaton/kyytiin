import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { RidelistComponent } from '../components/ridelist/ridelist.component';
import { AuthDialogComponent } from '../components/auth-dialog/auth-dialog.component';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class LocalAuthService {
    apiUrl = `${environment.apiUrl}`;
    apiUrlSocial = `${environment.apiUrl}/auth/social`;
    apiUrlLocalLogin = `${environment.apiUrl}/auth/local/login`;
    apiUrlLocalRegister = `${environment.apiUrl}/auth/local/register`;
    constructor(private http: HttpClient, private router: Router, private jwt: JwtHelperService) { }

    authenticate(user) {
        let response = new Promise((resolve, reject) => {
            if (user) {
                this.http.post(this.apiUrlSocial, user)
                    .toPromise()
                    .then(
                        res => {
                            this.setToken(res);
                            location.reload();
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
                        resolve(res);
                    },
                    err => {
                        reject(err);
                    }
                );
        });
        return response;
    }
    private setToken(res) {
        localStorage.setItem('token', res.token);
    }

    decodeToken() {
        const token = localStorage.getItem('token')
        if (token != null) {
            const decodedToken = this.jwt.decodeToken(token);
            return (decodedToken._id);
        } else {
            return null;
        }
    }
    signOut() {
        localStorage.removeItem('token');
        window.location.reload();
    }
    verifyEmail(emailUUID) {
        let response = new Promise((resolve, reject) => {
            this.http.get(`${this.apiUrl}/auth/verify-account/${emailUUID}`)
                .toPromise()
                .then(
                    res => resolve(res),
                    err => reject(err)
                );
        });
        return response;
    }
    //Vaihtaa checkLocalStorage (vitun paska muuttujan nimi) arvon app.componentissa, 
    //implikoi käyttäjälle (ja meille) kirjautumisen tilan
    private checkLocalStorage = new Subject<any>();
    checkLocalStorage$ = this.checkLocalStorage.asObservable();

    checkLocalStorageToken() {
        this.checkLocalStorage.next();
    }
}
