import { Component, OnInit } from '@angular/core';
import {Book} from '../../object/book';
import {CartService} from '../../service/cart.service';
import {OrderService} from '../../service/order.service';
import {OrderItem} from '../../object/order-item';
import {Router} from '@angular/router';
import {Order} from '../../object/order';
import {UserService} from '../../service/user.service';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  allBooks: Book[] = [];

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.allBooks = this.cartService.cartBox;
  }

  deleteBook(id: number): void {
    this.cartService.deleteBookById(id);
    this.allBooks = this.cartService.cartBox;
  }

  makeOrder(): void {
    let orderItem: OrderItem[] = this.cartService.getItems();

    this.userService.getUserByUsername(this.authService.getAuthUsername()).subscribe(res => {
      let order = new Order(res.id, this.cartService.getCost(), 'IN_PROCESSING', 'YANDEX_GO', this.cartService.getItems());

      this.orderService.createNewOrder(order).subscribe(res => {
        this.cartService.cartBox = [];
        this.router.navigate(['/profile']);
      });
    });
  }
}
