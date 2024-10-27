import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardModule} from 'primeng/card';
import {CommonModule, CurrencyPipe, NgClass} from '@angular/common';
import {Product, ProductForm} from '../../model/Product.model';
import {FormsModule} from '@angular/forms';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';
import {ButtonModule} from 'primeng/button';
import {RatingModule} from 'primeng/rating';
import {TagModule} from 'primeng/tag';
import {SelectButton} from 'primeng/selectbutton';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {CartService} from '../../services/cart.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CardModule,
    NgClass,
    CurrencyPipe,
    CommonModule,
    FormsModule,
    CommonModule,
    DataViewModule,
    DropdownModule,
    PaginatorModule,
    ButtonModule,
    RatingModule,
    TagModule,
    CardModule,
    SelectButton,
    ProductDetailsComponent
  ],
  providers: [ProductService],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product; // This should be your product model with all the necessary fields
  @Input() isAdmin!: boolean; // Input to control role-based buttons
  @Output() removeProduct = new EventEmitter();
  selectedProduct: ProductForm | null = null;
  showOverlay: boolean = false;

  openProductDetails(product: any) {
    this.selectedProduct = product;
    this.showOverlay = true;
  }

  constructor(private readonly productService: ProductService,
              private readonly router: Router,
              private readonly cartService: CartService,
              private readonly toastr: ToastrService
  ) {

  }

  addToCart() {
    console.log('Product added to cart:', this.product.title);
    const productCart = {sku: '', title: '', price: 0, quantity: 1, image: ''};
    productCart.sku = this.product.sku;
    productCart.title = this.product.title;
    productCart.image = this.product.imageUrl;
    productCart.price = this.product.price;
    this.cartService.addToCart(productCart);
    this.toastr.success(`Product ${this.product.title} added to cart successfully!`,'Add To Cart');
  }

  updateProduct() {
    console.log('Updating product:', this.product.title);
    // Update product logic here
    this.router.navigate(['products/', this.product.sku])
  }

  deleteProduct() {
    console.log('Deleting product:', this.product.title);
    this.productService.deleteProduct(this.product.sku).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success(`Product '${this.product.title}' was Deleted successfully`, 'Delete Product');
      },
      error: (err) => {
        console.log('Error When request delete:');
        console.log(err);
        this.toastr.error('Ops! Error happening when deleting product!', 'Delete Product');
      }
    });
    this.removeProduct.emit(this.product.sku);
  }

  openOverlay(product: ProductForm) {
    this.selectedProduct = product;
  }

  closeOverlay() {
    this.selectedProduct = null; // Close the overlay
  }
}
