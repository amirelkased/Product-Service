import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { NewProductComponent } from './components/new-product/new-product.component';

export const routes: Routes = [
    { path: "", component: ProductsComponent },
    { path: "products", component: ProductsComponent },
    { path: "products/new", component: NewProductComponent }
];
