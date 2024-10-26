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

  addToCart(product: ProductCart) {
    const existingProduct = this.cartProducts.find(item => item.sku === product.sku);
    if (existingProduct) {
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

  updateCart() {
    this.cartSubject.next(this.cartProducts);
    this.cartCountSubject.next(this.cartProducts.reduce((acc, product) => acc + product.quantity, 0));
  }
}
