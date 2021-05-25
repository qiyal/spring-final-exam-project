import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginData} from '../object/login-data';

@Injectable()
export class AuthService {
  api = '/auth';
  isAuth = false;

  constructor(private http: HttpClient) { }

  initService(): void {
    if (localStorage.getItem('BEAR')) {
      this.isAuth = true;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('BEAR') ? localStorage.getItem('BEAR') : '';
  }

  getIsAuth(): boolean {
    return this.isAuth;
  }

  public login(loginData: LoginData): Observable<any> {
    return this.http.post<any>(this.api, loginData, {observe: 'response'});
  }

  setToken(token: string | null): void {
    if (typeof token === 'string') {
      localStorage.setItem('Bearer', token.replace('Bearer', ''));
    }
    this.isAuth = true;
  }

  logout(): void {
    localStorage.removeItem('Bearer');
    this.isAuth = false;
  }
}
