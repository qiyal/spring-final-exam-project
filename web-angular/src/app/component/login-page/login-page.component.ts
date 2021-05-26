import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  onClick(): void {
    this.authService.login(this.loginForm.getRawValue()).subscribe(res => {
      if (res.headers.get('authorization')) {
        this.authService.setToken(res.headers.get('authorization'), this.loginForm.getRawValue().username);
        this.router.navigate(['/profile']);
      }
    });
  }
}
