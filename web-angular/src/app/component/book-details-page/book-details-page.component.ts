import { Component, OnInit } from '@angular/core';
import {Book} from '../../object/book';
import {BookService} from '../../service/book.service';
import {ActivatedRoute} from '@angular/router';
import {Comment} from '../../object/comment';
import {CommentsService} from '../../service/comments.service';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-book-details-page',
  templateUrl: './book-details-page.component.html',
  styleUrls: ['./book-details-page.component.scss']
})
export class BookDetailsPageComponent implements OnInit {
  book: Book = new Book(-1, ', ', '', 0, 0, '');
  bookId = -1;
  comments: Comment[] = [];
  formComment: FormGroup = new FormGroup({});
  showCommentForm = false;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private commentService: CommentsService,
    private authUser: AuthService,
    private userService: UserService
  ) {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBookById(this.bookId).subscribe(res => {
      this.book = res;
    });
    this.getComments();
  }

  ngOnInit(): void {
  }

  getComments(): void {
    this.commentService.getCommentById(this.bookId).subscribe(res => {
      this.comments = res;
    });
  }

  showCreateFormComment(): void {
    if (!this.showCommentForm) {
      this.initCommentForm();
    } else {
      this.showCommentForm = false;
    }
  }

  cancel(): void {
    this.showCommentForm = false;
  }

  initCommentForm(): void {
    this.userService.getUserByUsername(this.authUser.getAuthUsername()).subscribe(res => {
      this.formComment = new FormGroup({
        userId: new FormControl(res.id),
        bookId: new FormControl(this.bookId),
        text: new FormControl(''),
        // user: new FormControl(res)
      });

      this.showCommentForm = true;
    });
  }

  saveComment(): void {
    console.log(this.formComment.getRawValue());
    this.commentService.createComment(this.formComment.getRawValue()).subscribe(res => {
      this.commentService.getCommentById(this.bookId).subscribe(res2 => {
        this.comments = res2;
        this.showCommentForm = false;
      });
    });
  }

  deleteComment(id: number): void {
    this.commentService.deleteComment(id).subscribe(res => {
      this.getComments();
    });
  }

  getUsername(): string | null {
    return this.authUser.getAuthUsername();
  }
}
