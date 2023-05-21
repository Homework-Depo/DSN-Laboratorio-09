import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products: any
  displayedColumns: string[] = ['id', 'name', 'brand', 'model', 'price', 'stock', 'img', 'actions'];

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  sendToDetails(id: number) {
    this.router.navigate(['/detail', id]);
  }

  submitForDeletion(id: number, imgS3Key: string) {
    this.productService.deleteProduct(id, imgS3Key);
  }
}
