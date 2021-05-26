export class OrderItem {
  public quantity: number;
  public bookId: number;

  constructor(quantity: number, bookId: number) {
    this.quantity = quantity;
    this.bookId = bookId;
  }
}
