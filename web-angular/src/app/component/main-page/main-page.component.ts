import { Component, OnInit } from '@angular/core';
import {BookService} from '../../service/book.service';
import {Book} from '../../object/book';
import {Router} from '@angular/router';
import {CartService} from '../../service/cart.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  allBooks: Book[] = [];

  constructor(
    private bookService: BookService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(res => {
      this.allBooks = res;
    });
  }

  onClickCard(bookId: number): void {
    this.router.navigate(['/book-detail', bookId]);
  }

  addToCart(book: Book): void {
    this.cartService.addToCart(book);
  }
}
