import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/Product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductPage } from '../../model/ProductPage.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ProductCardComponent,
    PaginatorComponent
  ],
  providers: [ProductService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  page: ProductPage = {
    data: [],
    totalElements: 0,
    totalPages: 0,
    pageSize: 6,
    pageNumber: 0,
    numberOfElements: 6
  };

  constructor(private readonly productService: ProductService) {

  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProductsByPage(this.page.pageNumber, this.page.pageSize).subscribe({
      next: (response: ProductPage) => {
        console.log(response);
        this.page = response;
        this.products = response.data.map(
          product => {
            let pro = new Product(
              product.sku,
              product.title,
              product.description,
              product.price,
              product.imageUrl,
              product.category,
              product.brand,
              "",
              100
            )

            return pro;
          }
        );
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  goToNextPage(): void {
    if (this.page.pageNumber < this.page.totalPages) {
      this.page.pageNumber++;
      this.fetchProducts();
    }
  }

  goToPreviousPage(): void {
    if (this.page.pageNumber >= 1) {
      this.page.pageNumber--;
      this.fetchProducts();
    }
  }

  trackByProductId(index: number, product: Product): string {
    return product.sku; // Assuming each product has a unique id
  }

}
