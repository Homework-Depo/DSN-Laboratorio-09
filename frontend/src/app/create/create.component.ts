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
  title = 'Crear';
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: '',
      brand: '',
      model: '',
      price: '',
      stock: '',
      imgFile: null
    });
  }

  ngOnInit(): void {
    this.productForm.valueChanges.subscribe();
  }

  onFileSelect(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.productForm.patchValue({ imgFile: file });

      const fileNameSpan = document.querySelector('.file-name');
      if (fileNameSpan) {
        fileNameSpan.textContent = file.name;
      }
    }
  }

  submitProductForm() {
    const data = new FormData();
    data.append('name', this.productForm.value.name);
    data.append('brand', this.productForm.value.brand);
    data.append('model', this.productForm.value.model);
    data.append('price', this.productForm.value.price);
    data.append('stock', this.productForm.value.stock);
    data.append('imgFile', this.productForm.value.imgFile);

    this.productService.createProduct(data)
  }
}
