import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';

export const routes: Routes = [
    { path: "", component: ProductsComponent },
    { path: "products", component: ProductsComponent },
    { path: "products/new", component: CreateProductComponent },
    {path:"products/:id", component : UpdateProductComponent}
];
