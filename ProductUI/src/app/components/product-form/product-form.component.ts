import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { BrandService } from '../../services/brand.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CategoryPage } from '../../model/Category.model';
import { BrandPage } from '../../model/Brand.model';
import { ProductForm } from '../../model/Product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  @Input() productData!: ProductForm ;  
  @Input() actionLabel: string = 'Create Product';
  @Output() formSubmit = new EventEmitter<any>();
  productForm!: FormGroup;
  categories!: string[];
  brands!: string[];

  constructor(private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
    private readonly fb: FormBuilder,
    private readonly productService: ProductService,
    private readonly router: Router
  ) {

  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(8)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      imageUrl: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
    });
    this.fetchAllCategories();
    this.fetchAllBrands();
  }

  fetchAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      {
        next: (res: CategoryPage) => {
          this.categories = res.data.map(
            category => category.name
          )
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  fetchAllBrands() {
    this.brandService.getAllBrands().subscribe(
      {
        next: (res: BrandPage) => {
          this.brands = res.data.map(
            brand => brand.name
          )
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.formSubmit.emit(this.productForm.value);  // Send form data to parent
    }
  }
  ngOnChanges() {
    if (this.productData) {
      this.productForm.patchValue(this.productData);  // Patch the form with product data
      console.log('Product data loaded in form:', this.productData);
    }
  }

}
