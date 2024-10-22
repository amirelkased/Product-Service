import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewProduct, Product } from '../../model/Product.model';
import { CategoryService } from '../../services/category.service';
import { Category, CategoryPage } from '../../model/Category.model';
import { BrandService } from '../../services/brand.service';
import { BrandPage } from '../../model/Brand.model';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [CategoryService],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit {
  productForm: FormGroup;
  newProduct: NewProduct = {
    title: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
    brand: '',
    stock: 0
  };
  categories!: string[];
  brands!: string[];

  constructor(private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
    private readonly fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(8)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(1)]],
      imageUrl: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
    });
  }

  ngOnInit(): void {
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
      console.log('Product to be created:', this.productForm.value);
      // Example: Call a service to create the product
      // this.productService.createProduct(this.productForm.value).subscribe(response => { ... });
    }
  }

}
