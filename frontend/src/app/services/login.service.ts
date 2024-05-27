import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

type loginResponse = {
  status: number;
  mensaje: string;
  data: any[];
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private APP_DOMAIN: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.APP_DOMAIN = 'http://localhost:3000';
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }

  login(email: string, contrasena: string) {
    return this.http.post<loginResponse>(`${this.APP_DOMAIN}/login`, {headers: this.headers, email, contrasena});
  }
}