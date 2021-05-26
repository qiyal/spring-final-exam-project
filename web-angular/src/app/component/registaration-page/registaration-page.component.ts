import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Role} from '../../object/role';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registaration-page',
  templateUrl: './registaration-page.component.html',
  styleUrls: ['./registaration-page.component.scss']
})
export class RegistarationPageComponent implements OnInit {
  userForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    roles: [[new Role(2, 'USER')]],
    favoriteBooks: [[]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get username(): FormControl {
    return this.userForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.userForm.get('password') as FormControl;
  }

  get name(): FormControl {
    return this.userForm.get('name') as FormControl;
  }

  get surname(): FormControl {
    return this.userForm.get('surname') as FormControl;
  }

  onClick(): void {
    this.userService.createUser(this.userForm.getRawValue()).subscribe(res => {
      if (res !== null) {
        this.router.navigate(['/login']);
      }
    });
  }
}
