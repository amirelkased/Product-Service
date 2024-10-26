import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CartService, ProductCart} from '../../services/cart.service';
import {Router, RouterLink} from '@angular/router';
import {CouponService} from '../../services/coupon.service';
import {CouponRequest} from '../../model/CouponResponse.model';
import {OrderService} from '../../services/order.service';
import {OrderRequest} from '../../model/OrderRequest.model';
import {Order, OrderItem} from '../../model/OrderResponse.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgOptimizedImage],
  providers: [CouponService],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: ProductCart[] = [];
  couponCode: string = '';
  totalAmount: number = 0;
  taxs: number = 14;
  discount: number = 0;
  isCouponValid: boolean = true;
  couponErrorMessage: string = '';
  loggedIn: boolean = false;
  orderFail: boolean = false;
  orderErrorMessage: string = '';

  constructor(private readonly cartService: CartService,
              private readonly couponService: CouponService,
              private readonly orderService: OrderService,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.cartService.cart$.subscribe(products => {
      this.cartProducts = products;
      this.calculateTotal();
    });
  }

  applyCoupon() {
    if (this.couponCode.length == 0) return;
    const conponReq: CouponRequest = {
      coupon: this.couponCode,
      amount: (this.totalAmount - this.taxs)
    };
    this.couponService.consume(conponReq).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this.isCouponValid = true;
          console.log(res)
          this.discount = (this.totalAmount - this.taxs - res.amount);
          this.calculateTotal();
        } else {
          this.isCouponValid = false;
          this.couponErrorMessage = res.message;
        }
      }
    })
  }

  calculateTotal() {
    const subtotal = this.cartProducts.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    this.totalAmount = (subtotal - this.discount + this.taxs);
    console.log(`subtotal ${subtotal} dis ${this.discount} total amount ${this.totalAmount} tax ${this.taxs}`)
  }

  changeQuantity($event: any, item: ProductCart) {
    console.log(`Quautity changes for ${item.title} ${$event.target.value}`);
    item.quantity = $event.target.value;
    this.calculateTotal();
    this.applyCoupon();
  }

  removeFromCart(item: ProductCart) {
    this.cartService.removeFromCart(item.sku);
  }


  handlePurchase() {
    if (!this.loggedIn) {
      this.checkout();
    } else {
      // Route to the login page
      this.router.navigate(['/login']);
    }
  }

  checkout() {
    // Logic for checkout
    console.log('Proceeding to checkout');
    const orderRequest: OrderRequest = new OrderRequest({
      customerId: 1900119,
      couponCode: this.couponCode,
      orderItems: this.cartProducts.map(product => new OrderItem({
        productSku: product.sku,
        quantity: product.quantity
      }))
    });

    this.orderService.placeOrder(orderRequest).subscribe({
      next: (res) => {
        console.log(`order created successfully`);
        this.storeOrderLocally(res);
        this.router.navigate(['orders']);
      },
      error: (err) => {
        console.log(`failed to create order`);
        console.log(err);
        this.orderErrorMessage = err.error.message;
        this.orderFail = true;
      }
    });
  }

  storeOrderLocally(order: Order) {
    let orders: Order[] = [];
    const data = localStorage.getItem("orders");

    if (data) {
      orders = JSON.parse(data);
    }
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
  }
}