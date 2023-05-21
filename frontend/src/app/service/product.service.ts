import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API: string = 'http://localhost:3000/api/product';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getSelectedProduct(id: number) {
    return this.http.get(`${this.API}/${id}`);
  }

  getProducts() {
    return this.http.get(this.API);
  }

  createProduct(product: any) {
    return this.http.post(this.API, product).subscribe(
      _ => {
        this.router.navigate(["/"]);
      }, error => {
        console.log(error);
      }
    )
  }

  deleteProduct(id: number, imgS3Key: string) {
    this.http.post(`${this.API}/${id}/delete`, { imgS3Key: imgS3Key }).subscribe(
      _ => {
        this.router.navigate(["/"]);
      }, error => {
        console.log(error);
      }
    )
  };
}
