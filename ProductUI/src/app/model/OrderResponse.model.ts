export class Order {
  createdAt: string;
  lastModifiedAt: string;
  id: number;
  couponCode: string;
  couponApplied: boolean;
  orderItems: OrderItem[];
  customerId: number;
  merchant: number;
  totalAmount: number;
  discountAmount: number;
  customerTransactionId: string;
  merchantTransactionId: string;
  orderStatus: string;
  paymentStatus: string;

  constructor(data: any) {
    this.createdAt = data.createdAt;
    this.lastModifiedAt = data.lastModifiedAt;
    this.id = data.id;
    this.couponCode = data.couponCode;
    this.couponApplied = data.couponApplied;
    this.orderItems = data.orderItems.map((item: any) => new OrderItem(item));
    this.customerId = data.customerId;
    this.merchant = data.merchant;
    this.totalAmount = data.totalAmount;
    this.discountAmount = data.discountAmount;
    this.customerTransactionId = data.customerTransactionId;
    this.merchantTransactionId = data.merchantTransactionId;
    this.orderStatus = data.orderStatus;
    this.paymentStatus = data.paymentStatus;
  }
}

export class OrderItem {
  createdAt: string;
  lastModifiedAt: string;
  id: number;
  quantity: number;
  productSku: string;
  price: number;

  constructor(data: any) {
    this.createdAt = data.createdAt;
    this.lastModifiedAt = data.lastModifiedAt;
    this.id = data.id;
    this.quantity = data.quantity;
    this.productSku = data.productSku;
    this.price = data.price;
  }
}

export class OrderPageResponse {
  totalElements: number;
  totalPages: number;
  pageSize: number;
  pageNumber: number;
  numberOfElements: number
  data: Order[];

  constructor(order: any) {
    this.pageNumber = order.pageNumber;
    this.pageSize = order.pageSize;
    this.totalPages = order.totalPages;
    this.totalElements = order.totalElements;
    this.numberOfElements = order.numberOfElements;
    this.data = order.data;
  }
}
