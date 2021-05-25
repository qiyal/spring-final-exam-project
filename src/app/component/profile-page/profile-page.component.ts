import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../object/user';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: User = new User(-1, '', '', '', '', '', []);

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.setAuthUser();
  }

  setAuthUser(): void {
    this.userService.getUserByUsername(this.authService.getAuthUsername()).subscribe(res => {
      this.user = res;
    });
  }

}
