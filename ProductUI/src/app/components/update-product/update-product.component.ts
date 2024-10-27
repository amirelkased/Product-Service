import {Component} from '@angular/core';
import {ProductFormComponent} from '../product-form/product-form.component';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FullFormProduct, ProductForm} from '../../model/Product.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './update-product.component.html'
})
export class UpdateProductComponent {
  existingProduct!: ProductForm;

  constructor(private readonly productService: ProductService,
              private readonly route: ActivatedRoute,
              private readonly toastr:ToastrService,
              private readonly router:Router
  ) {
    this.route.params.subscribe(
      params => {
        this.fetchProduct(params['id']);
      })
  }

  fetchProduct(sku: string) {
    this.productService.getProductById(sku).subscribe({
      next: (product: FullFormProduct) => {
        console.log(product);

        this.existingProduct = new ProductForm(
          product.title,
          product.description,
          product.price,
          product.imageUrl,
          product.category.name,
          product.brand.name
        );
        console.log('exists pro: ', this.existingProduct);  // Move this inside
      },
      error: (err) => {
        console.error('Error fetching product:', err)
        this.toastr.error(`Ops! Error: ${err.error.message}`, 'Update Product');
      }
    });
  }


  onUpdate(productData: ProductForm) {
    console.log('Updating product:', productData);
    // Logic to send the data to the backend for updating
    this.productService.updateProduct(this.route.snapshot.params['id'], productData).subscribe({
      next: (res: FullFormProduct) => {
        console.log(`Updated product ${JSON.stringify(res)}`);
        this.router.navigate(['/']);
        this.toastr.success(`Product Updated Successfully`, 'Update Product');
      },
      error: (err) => {
        console.log(`Error when update product : ${JSON.stringify(err)}`);
        this.toastr.error(`Ops! Error: ${err.error.message}`, 'Update Product');
      }
    });
  }
}
