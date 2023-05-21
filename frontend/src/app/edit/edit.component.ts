import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  title = 'Editar';
  product: any;
  id: number = 0;
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      id: null,
      name: '',
      brand: '',
      model: '',
      price: '',
      stock: '',
      imgS3Key: '',
      imgFile: null
    });
  }

  ngOnInit(): void {
    this.getIdFromRoute();
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
    data.append('imgS3Key', this.productForm.value.imgS3Key);
    data.append('imgFile', this.productForm.value.imgFile);

    this.productService.updateProduct(this.productForm.value.id, data);
  }

  getIdFromRoute(): void {
    this.router.params.subscribe({
      next: params => {
        this.id = Number(params['id']);
        this.productService.getSelectedProduct(this.id).subscribe(
          product => {
            this.product = product;
            console.log(this.product);
            this.fillFormFields();
          },
          error => {
            console.log(error);
          }
        );
      },
      error: error => {
        console.log(error);
      }
    });
  }
  
  fillFormFields(): void {
    this.productForm.patchValue({
      id: this.product.id,
      name: this.product.name,
      brand: this.product.brand,
      model: this.product.model,
      price: this.product.price,
      stock: this.product.stock,
      imgS3Key: this.product.imgS3Key
    });
  } 
}
