import { Injectable } from '@angular/core';
import {Book} from '../object/book';
import {OrderItem} from '../object/order-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartBox: Book[] = [];

  constructor(

  ) { }

  addToCart(book: Book): void {
    this.cartBox.push(book);
  }

  deleteBookById(id: number): void {
    let newCartBox: Book[] = [];
    let k = 0;

    for (const elem of this.cartBox) {
      if (k === 0 && elem.id === id) {
        k++;
      } else {
        newCartBox.push(elem);
      }
    }

    this.cartBox = newCartBox;
  }

  getItems(): OrderItem[] {
    let res: OrderItem[] = [];

    for (let elem of this.cartBox) {
      let has = false;

      for (let r of res) {
        if (r.bookId === elem.id) {
          r.quantity++;
          has = true;
        }
      }

      if (!has) {
        res.push(new OrderItem(1, elem.id));
      }
    }

    return res;
  }

  getCost(): number {
    let cost = 0;

    for (let elem of this.cartBox) {
      cost += elem.price;
    }

    return cost;
  }
}
