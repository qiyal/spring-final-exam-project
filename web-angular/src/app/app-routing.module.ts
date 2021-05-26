import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from './component/main-page/main-page.component';
import {LoginPageComponent} from './component/login-page/login-page.component';
import {ProfilePageComponent} from './component/profile-page/profile-page.component';
import {BookDetailsPageComponent} from './component/book-details-page/book-details-page.component';
import {RegistarationPageComponent} from './component/registaration-page/registaration-page.component';
import {CartPageComponent} from './component/cart-page/cart-page.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'profile',
    component: ProfilePageComponent
  },
  {
    path: 'book-detail/:id',
    component: BookDetailsPageComponent
  },
  {
    path: 'registration',
    component: RegistarationPageComponent
  },
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
