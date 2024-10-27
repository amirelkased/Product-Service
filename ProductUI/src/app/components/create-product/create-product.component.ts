import {Component} from '@angular/core';
import {ProductFormComponent} from '../product-form/product-form.component';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {Product} from '../../model/Product.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './create-product.component.html'
})
export class CreateProductComponent {

  constructor(private readonly productService: ProductService,
              private readonly router: Router,
              private readonly toastr: ToastrService
  ) {

  }

  onCreate(productData: any) {
    console.log('Creating product:', productData);
    // Logic to send the data to the backend for creation
    this.productService.createProduct(productData).subscribe({
      next: (res: Product) => {
        console.log(res);
        this.router.navigate(['']);
        this.toastr.success('Product created successfully!', 'Create Product');
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error(`Ops! Error: ${err.error.message}`, 'Create Product');
      }
    });
  }
}

