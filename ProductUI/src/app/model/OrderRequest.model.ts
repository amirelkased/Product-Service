class OrderItems {
  constructor(public productSku: string,
              public quantity: string) {
  }
}

export class OrderRequest {
  customerId: number;
  couponCode: string;
  orderItems: OrderItems[];

  constructor(order: any) {
    this.customerId = order.customerId;
    this.couponCode = order.couponCode;
    this.orderItems = order.orderItems;
  }

}
