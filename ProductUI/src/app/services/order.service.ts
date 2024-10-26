import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {OrderRequest} from '../model/OrderRequest.model';
import {Observable} from 'rxjs';
import {Order, OrderPageResponse} from '../model/OrderResponse.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly RESOURCE_URL = 'http://localhost:8081/api/v1/orders'

  constructor(
    private readonly http: HttpClient
  ) {
  }

  placeOrder(order: OrderRequest): Observable<Order> {
    return this.http.post<Order>(this.RESOURCE_URL, order);
  }

  getAllOrders(customerId: number | string, from?: Date, to?: Date): Observable<OrderPageResponse> {
    let params = new HttpParams();
    if (from) {
      params = params.set('from', from.toISOString());
    } else {
      params = params.set('from', '1970-01-01')
    }
    if (to) {
      params = params.set('to', to.toISOString());
    } else {
      params = params.set('to', '2024-10-26')
    }
    console.log(`from ${params.get('from')}, to ${params.get('to')}`);
    return this.http.get<OrderPageResponse>(`${this.RESOURCE_URL}/${customerId}`, {params});
  }

  getOrderById(customerId: number, orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.RESOURCE_URL}/${customerId}/${orderId}`);
  }
}
