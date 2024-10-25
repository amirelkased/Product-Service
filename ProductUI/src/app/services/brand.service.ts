import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandPage } from '../model/Brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly RESOURCE_URL = 'http://localhost:8080/api/v1/brands'

  constructor(private readonly http:HttpClient) { }

  getAllBrands():Observable<BrandPage> {
    return this.http.get<BrandPage>(this.RESOURCE_URL+'?limit:63');
  }
}
