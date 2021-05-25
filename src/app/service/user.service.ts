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
}
