import {OrderItem} from './order-item';

export class Order {
  // public id: number;
  public userId: number;
  public cost: number;
  public status: string;
  public shippingMethod: string;
  public orderItems: OrderItem[];


  constructor(userId: number, cost: number, status: string, shippingMethod: string, orderItems: OrderItem[]) {
    // this.id = id;
    this.userId = userId;
    this.cost = cost;
    this.status = status;
    this.shippingMethod = shippingMethod;
    this.orderItems = orderItems;
  }
}
