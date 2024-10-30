// cart.service.ts
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface ProductCart {
  sku: string;
  title: string;
  image: string;
  quantity: number;
  price: number;
  stock: number;
  description: string;
  maxQuantity?: number[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartProducts: ProductCart[] = [];
  private couponCode: string = '';
  private cartSubject = new BehaviorSubject<ProductCart[]>(this.cartProducts);
  private cartCountSubject = new BehaviorSubject<number>(0);
  cart$ = this.cartSubject.asObservable();
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    this.loadCartFromLocalStorage();
    this.loadCouponFromLocalStorage();
  }

  private loadCartFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cartProducts = JSON.parse(cartData);
      this.updateCart();
    }
  }

  private loadCouponFromLocalStorage() {
    const coupon = localStorage.getItem('coupon');
    if (coupon) {
      this.couponCode = coupon;
    }
  }

  addToCart(product: ProductCart) {
    const existingProduct = this.cartProducts.find(item => item.sku === product.sku);
    if (existingProduct == undefined) {
      this.cartProducts.push({...product, quantity: 1}); // Add new product
    }
    this.updateCart();
  }

  removeFromCart(productId: string) {
    this.cartProducts = this.cartProducts.filter(product => product.sku !== productId);
    this.updateCart();
  }

  updateCart(isCheckout: boolean = false) {
    this.updateLocalStorageForCart(isCheckout);
    this.cartSubject.next(this.cartProducts);
    this.cartCountSubject.next(this.cartProducts.length);
  }

  checkOut(){
    this.updateLocalStorageForCoupon(true);
    this.updateCart(true);
  }

  private updateLocalStorageForCart(isCheckout: boolean = false) {
    if (isCheckout) {
      localStorage.removeItem('cart');
      this.cartProducts = [];
    } else {
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }

  private updateLocalStorageForCoupon(isCheckout: boolean = false) {
    if (isCheckout) {
      localStorage.removeItem('coupon');
      this.couponCode = ''
    } else {
      localStorage.setItem('coupon', this.couponCode);
    }
  }

  updateQuantity(products: ProductCart[]) {
    this.cartProducts = products;
    this.updateLocalStorageForCart();
  }

  appliedCoupon(coupon: string) {
    this.couponCode = coupon;
    this.updateLocalStorageForCoupon();
  }

  getCouponIfExists(): string {
    this.loadCouponFromLocalStorage();
    return this.couponCode;
  }
}
