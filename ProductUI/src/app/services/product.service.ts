import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductPage } from '../model/ProductPage.model';
import { ProductForm, Product, FullFormProduct } from '../model/Product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly RESOURCE_URL = 'http://localhost:8080/api/v1/products'

  constructor(private readonly http: HttpClient) { }

  getProductsByPage(page: number = 0, size: number = 20): Observable<ProductPage> {
    return this.http.get<ProductPage>(`${this.RESOURCE_URL}?page=${page}&size=${size}`);
  }

  createProduct(product: ProductForm): Observable<Product> {
    return this.http.post<Product>(this.RESOURCE_URL, product);
  }

  deleteProduct(sku: string) {
    return this.http.delete(`${this.RESOURCE_URL}/${sku}`);
  }

  getProductById(sku: string): Observable<FullFormProduct> {
    return this.http.get<FullFormProduct>(`${this.RESOURCE_URL}/${sku}`);
  }

  updateProduct(sku:string, productData: ProductForm):Observable<FullFormProduct>{
    return this.http.put<FullFormProduct>(`${this.RESOURCE_URL}/${sku}`, productData);
  }
}
