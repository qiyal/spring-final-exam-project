import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginData} from '../object/login-data';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  api = '/auth';
  isAuth = false;
  authUsername: string | null = '';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.initService();
  }

  initService(): void {
    if (localStorage.getItem('Bearer')) {
      this.isAuth = true;

      if (typeof localStorage.getItem('username') === 'string') {
        this.authUsername = localStorage.getItem('username');
      }
    }
  }

  getToken(): string | null {
    return localStorage.getItem('Bearer') ? localStorage.getItem('Bearer') : '';
  }

  getIsAuth(): boolean {
    return this.isAuth;
  }

  public login(loginData: LoginData): Observable<any> {
    return this.http.post<any>(this.api, loginData, {observe: 'response'});
  }

  setToken(token: string | null, username: string): void {
    if (typeof token === 'string') {
      localStorage.setItem('username', username);
      localStorage.setItem('Bearer', token.replace('Bearer', ''));
      this.authUsername = username;
    }
    this.isAuth = true;
  }

  logout(): void {
    localStorage.removeItem('Bearer');
    this.isAuth = false;
    this.authUsername = '';
    this.router.navigate(['/']);
  }

  getAuthUsername(): string | null {
    console.log(this.authUsername);
    return this.authUsername;
  }
}
