import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.config';

@Injectable()
export class NotificationService {
    apiUrl: string = `${API_URL}`
    constructor(private http: HttpClient) {}

    // Haetaan käyttäjän ilmoitukset palvelimelta
    getUserNotifications(customer_id): Promise<any> {
        let response = new Promise((resolve, reject) => {
            this.http.get(`${this.apiUrl}/notifications/${customer_id}`)
            .toPromise()
            .then(
                res => resolve(res),
                err => reject(err)
            );
        });
        return response;
    }

}