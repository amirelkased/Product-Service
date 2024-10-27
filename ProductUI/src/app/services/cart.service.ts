// cart.service.ts
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface ProductCart {
  sku: string;
  title: string;
  image: string;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartProducts: ProductCart[] = [];
  private cartSubject = new BehaviorSubject<ProductCart[]>(this.cartProducts);
  private cartCountSubject = new BehaviorSubject<number>(0);

  cart$ = this.cartSubject.asObservable();
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    this.loadCartFromLocalStorage(); // Load cart data from local storage on initialization
  }

  private loadCartFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cartProducts = JSON.parse(cartData);
      this.updateCart(); // Update the BehaviorSubjects with loaded cart data
    }
  }

  addToCart(product: ProductCart) {
    const existingProduct = this.cartProducts.find(item => item.sku === product.sku);
    if (existingProduct != undefined && existingProduct.quantity <5) {
      existingProduct.quantity += 1; // Increase quantity if already in cart
    } else {
      this.cartProducts.push({...product, quantity: 1}); // Add new product
    }
    this.updateCart();
  }

  removeFromCart(productId: string) {
    this.cartProducts = this.cartProducts.filter(product => product.sku !== productId);
    this.updateCart();
  }

  updateCart(isCheckout:boolean = false) {
    this.updateLocalStorage(isCheckout);
    this.cartSubject.next(this.cartProducts);
    this.cartCountSubject.next(this.cartProducts.length);
  }

  private updateLocalStorage(isCheckout:boolean= false) {
    if (isCheckout){
      localStorage.removeItem('cart');
      this.cartProducts = [];
    }else {
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
}
