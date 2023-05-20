import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  title: string = 'Crear'
  productForm: FormGroup = this.fb.group({
    name: '',
    brand: '',
    model: '',
    price: '',
    stock: '',
    imgFile: ''
  });

  constructor(private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
    this.productForm.valueChanges.subscribe();
  }

  async submitProductForm() {
    const data = this.productForm.value;
    this.productService.createProduct(data)
  }
}
