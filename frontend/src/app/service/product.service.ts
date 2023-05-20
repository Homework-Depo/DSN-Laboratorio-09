import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get('http://localhost:3000/api/product');
  }

  createProduct(product: any) {
    this.http.post('http://localhost:3000/api/product', product).subscribe();
  }
}
