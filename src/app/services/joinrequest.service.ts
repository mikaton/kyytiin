import { Injectable } from '@angular/core';
import { API_URL } from '../app.config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JoinRequestService {
    apiUrl = `${API_URL}`;
    constructor(private http: HttpClient) {}
}