import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Product } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  urlResouce = '/products';

  constructor(
    public http: HttpClient,
  ) { }

  findOnlyProducts(): Observable<any> {
    return this.http.get(this.urlResouce, { responseType: 'json' });
  }

  findById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.urlResouce}/${id}`, { responseType: 'json' });
  }
}
