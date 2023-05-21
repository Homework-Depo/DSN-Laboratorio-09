import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API: string = 'http://localhost:3000/api/product';

  private productsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  products$ = this.productsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getSelectedProduct(id: number) {
    return this.http.get(`${this.API}/${id}`);
  }

  getProducts() {
    this.http.get<any[]>(this.API).subscribe({
      next: (products: any[]) => {
        this.productsSubject.next(products);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  createProduct(product: any) {
    this.http.post(this.API, product).subscribe({
      next: _ => {
        this.router.navigate(["/"]);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  deleteProduct(id: number, imgS3Key: string) {
    this.http.post(`${this.API}/${id}/delete`, { imgS3Key: imgS3Key }).subscribe({
      next: _ => {
        const currentProducts = this.productsSubject.getValue();
        if (Array.isArray(currentProducts)) {
          this.productsSubject.next(currentProducts.filter(product => product.id !== id));
        }
        this.router.navigate(["/"]);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  updateProduct(id:number, product: any) {
    this.http.post(`${this.API}/${id}`, product).subscribe({
      next: _ => {
        this.router.navigate(['/']);
      },
      error: error => {
        console.log(error);
      }
    });
  }
}