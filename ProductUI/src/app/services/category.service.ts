import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CategoryPage} from '../model/Category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly RESOURCE_URL = 'http://localhost:8080/api/v1/categories'

  constructor(private readonly http: HttpClient) {
  }

  getAllCategories(): Observable<CategoryPage> {
    return this.http.get<CategoryPage>(this.RESOURCE_URL + '?limit:1000');
  }
}
