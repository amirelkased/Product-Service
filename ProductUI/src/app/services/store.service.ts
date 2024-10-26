import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly RESOURCE_URL = 'http://localhost:8080/api/v1/stores'

  constructor(private readonly http: HttpClient) {
  }

  // getProductStock( sku:string):Observable<ProductStock>{
  //   return this.http.get<ProductStock>(this.RESOURCE_URL+`/${sku}/stock`);
  // }

  getProductStock(sku: string): number {
    return Math.floor(Math.random() * 10);
  }
}
