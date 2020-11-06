import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Product } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  urlResouce = 'http://localhost:8081/products';
  urlProducts = '../../assets/db/full-products.json';
  urlOnlyProducts = '../../assets/db/products.json';

  private corsHeaders: any;

  constructor(
    public http: HttpClient,
  ) { }

  findOnlyProducts(): Observable<any> {
    return this.http.get(this.urlOnlyProducts, { responseType: 'json' });
  }

  findAll(): Observable<any> {
    return this.http.get(this.urlProducts, { responseType: 'json' });
  }

  findById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.urlResouce}/${id}`, { reportProgress: true });
  }

}
