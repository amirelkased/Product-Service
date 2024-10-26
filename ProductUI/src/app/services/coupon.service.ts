import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CouponRequest, CouponResponse} from '../model/CouponResponse.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private readonly RESOURCE_URL = 'http://localhost:8081/api/v1/coupons/consume'

  constructor(private readonly http: HttpClient) {
  }

  public consume(couponRequest: CouponRequest): Observable<CouponResponse> {
    return this.http.post<CouponResponse>(this.RESOURCE_URL, couponRequest);
  }
}
