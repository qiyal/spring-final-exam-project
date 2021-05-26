import {OrderItem} from './order-item';

export class OrderDto {
  public id: number;
  public userId: number;
  public cost: number;
  public status: string;
  public shippingMethod: string;
  public day: Date;
  public orderItems: OrderItem[];


  constructor(id: number, userId: number, cost: number, status: string, shippingMethod: string, day: Date, orderItems: OrderItem[]) {
    this.id = id;
    this.userId = userId;
    this.cost = cost;
    this.status = status;
    this.shippingMethod = shippingMethod;
    this.day = day;
    this.orderItems = orderItems;
  }
}
