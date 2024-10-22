import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductPage } from '../model/ProductPage.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly RESOURCE_URL = '/api/v1/products'

  constructor(private readonly http: HttpClient) { }

  getAllProducts(): Observable<ProductPage> {
    return this.http.get<ProductPage>(this.RESOURCE_URL);
  }

  getProductsByPage(page: number=0, size: number=20): Observable<ProductPage> {
    return this.http.get<ProductPage>(`${this.RESOURCE_URL}?page=${page}&size=${size}`);
  }
}
