import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  api = '/orders';

  constructor(
    private http: HttpClient
  ) { }

  createNewOrder(data: any): Observable<any> {
    console.log(data);
    return this.http.post<any>(this.api + '/create', data);
  }

  getOrdersByUserId(id: number): Observable<any> {
    return this.http.get<any>(this.api + '?userId=' + id);
  }
}
