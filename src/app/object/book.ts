export class Book {
  public id: number;
  public author: string;
  public name: string;
  public price: number;
  public year: number;
  public imgUrl: string;

  constructor(id: number, author: string, name: string, price: number, year: number, imgUrl: string) {
    this.id = id;
    this.author = author;
    this.name = name;
    this.price = price;
    this.year = year;
    this.imgUrl = imgUrl;
  }
}
