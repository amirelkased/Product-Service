import {Component, Input} from '@angular/core';
import {CardModule} from 'primeng/card';
import {CommonModule, CurrencyPipe, NgClass} from '@angular/common';
import {Product} from '../../model/Product.model';
import {FormsModule} from '@angular/forms';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';
import {ButtonModule} from 'primeng/button';
import {RatingModule} from 'primeng/rating';
import {TagModule} from 'primeng/tag';
import {SelectButton} from 'primeng/selectbutton';

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
    SelectButton
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product; // This should be your product model with all the necessary fields
  @Input() isAdmin!: boolean; // Input to control role-based buttons

  constructor() {

  }

  addToCart() {
    console.log('Product added to cart:', this.product.title);    
    // Add product to cart logic here
  }

  updateProduct() {
    console.log('Updating product:', this.product.title);
    // Update product logic here
  }

  deleteProduct() {
    console.log('Deleting product:', this.product.title);
    // Delete product logic here
  }
}
