import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products: any
  displayedColumns: string[] = ['id', 'name', 'brand', 'model', 'price', 'stock', 'actions'];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.products = this.productService.getProducts()
  }
}
