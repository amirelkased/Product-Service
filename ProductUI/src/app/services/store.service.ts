import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ProductStock} from '../model/Stock.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  // private readonly RESOURCE_URL = 'http://localhost:8080/api/v1/stores'
  private readonly RESOURCE_URL = 'http://localhost:8083/stocks/search'

  constructor(private readonly http: HttpClient) {
  }

  getProductStock( sku:string):Observable<ProductStock>{
    return this.http.get<ProductStock>(this.RESOURCE_URL+`?sku=${sku}&storename=`);
  }
}
