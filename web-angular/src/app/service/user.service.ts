import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../object/user';

@Injectable()
export class UserService {
  api = '/users';

  constructor(
    private http: HttpClient
  ) { }

  getUserByUsername(username: string | null): Observable<User> {
    return this.http.get<User>(this.api + '?username=' + username);
  }

  createUser(data: any): Observable<User> {
    return this.http.post<User>(this.api + '/create', data);
  }

  updateUsername(username: string, idUser: number): Observable<any> {
    return this.http.patch<User>(this.api + '/' + idUser + '/update/username', username);
  }
}
