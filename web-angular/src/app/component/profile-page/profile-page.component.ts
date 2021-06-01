import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../object/user';
import {AuthService} from '../../service/auth.service';
import {OrderDto} from '../../object/order-dto';
import {OrderService} from '../../service/order.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: User = new User(-1, '', '', '', '', '', []);
  orders: OrderDto[] = [];
  newUsername = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.setAuthUser();
    this.getOrders();
  }

  setAuthUser(): void {
    this.userService.getUserByUsername(this.authService.getAuthUsername()).subscribe(res => {
      this.user = res;
    });
  }

  getOrders(): void {
    this.userService.getUserByUsername(this.authService.getAuthUsername()).subscribe(res => {
      this.orderService.getOrdersByUserId(res.id).subscribe(res2 => {
        this.orders = res2;
      });
    });
  }

  updateUsername(): void {
    this.userService.updateUsername(this.newUsername, this.user.id).subscribe(res => {
      if (res !== null) {
        this.user.username = res.username;
        this.newUsername = '';

        this.authService.login({username: res.username, password: '123'}).subscribe(res2 => {
          if (res2.headers.get('authorization')) {
            this.authService.setToken(res2.headers.get('authorization'), res.username);
          }
        });
      }
    });
  }
}
