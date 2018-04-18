import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class JoinRequestService {
    apiUrl = `${environment.apiUrl}`;
    constructor(private http: HttpClient) { }

    createRequest(data): Promise<any> {
        // Luodaan uusi pyyntö
        let response = new Promise((resolve, reject) => {
            this.http.post(`${this.apiUrl}/request`, data)
                .toPromise()
                .then(
                    data => resolve(data),
                    err => reject(err)
                );
        });
        return response;
    }

    getRequestById(request_id): Promise<any> {
        // Haetaan yksittäinen pyyntö palvelimelta request_id:llä
        let response = new Promise((resolve, reject) => {
            this.http.get(`${this.apiUrl}/request/${request_id}`)
                .toPromise()
                .then(
                    data => resolve(data),
                    err => reject(err)
                );
        });

        return response;
    }

    getAllRequestsByUserId(customer_id): Promise<any> {
        // Haetaan kaikki käyttäjän pyynnöt palvelimelta
        let response = new Promise((resolve, reject) => {
            this.http.get(`${this.apiUrl}/request/all/${customer_id}`)
                .toPromise()
                .then(
                    data => resolve(data),
                    err => reject(err)
                );
        });

        return response;
    }

    updateRequest(request_id, data): Promise<any> {
        // Päivitetään pyyntö
        let response = new Promise((resolve, reject) => {
            this.http.patch(`${this.apiUrl}/request/${request_id}`, data)
                .toPromise()
                .then(
                    data => resolve(data),
                    err => reject(err)
                );
        });

        return response;
    }

    deleteRequest(request_id): Promise<any> {
        // Poistetaan pyyntö
        let response = new Promise((resolve, reject) => {
            this.http.delete(`${this.apiUrl}/request/${request_id}`)
                .toPromise()
                .then(
                    data => resolve(data),
                    err => reject(err)
                );
        });
        return response;
    }
}