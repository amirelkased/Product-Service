import {Routes} from '@angular/router';
import {ProductsComponent} from './components/products/products.component';
import {UpdateProductComponent} from './components/update-product/update-product.component';
import {CreateProductComponent} from './components/create-product/create-product.component';
import {CartComponent} from './components/cart/cart.component';
import {OrdersComponent} from './components/orders/orders.component';
import {OrderDetailsComponent} from './components/order-details/order-details.component';

export const routes: Routes = [
  {path: "", component: ProductsComponent},
  {path: "products", component: ProductsComponent},
  {path: "products/new", component: CreateProductComponent},
  {path: "products/:id", component: UpdateProductComponent},
  {path: 'orders', component: OrdersComponent},
  {path: "orders/cart", component: CartComponent},
  {path: "orders/:id", component: OrderDetailsComponent}
];
