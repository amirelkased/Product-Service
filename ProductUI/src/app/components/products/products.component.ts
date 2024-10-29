import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../model/Product.model';
import {ProductCardComponent} from '../product-card/product-card.component';
import {ProductPage} from '../../model/ProductPage.model';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PaginatorComponent} from '../paginator/paginator.component';
import {StoreService} from '../../services/store.service';
import {ProductStock} from '../../model/Stock.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ProductCardComponent,
    PaginatorComponent
  ],
  providers: [ProductService, StoreService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  page: ProductPage = {
    data: [],
    totalElements: 0,
    totalPages: 0,
    pageSize: 21,
    pageNumber: 0,
    numberOfElements: 6
  };

  constructor(private readonly productService: ProductService,
              private readonly storeService: StoreService
  ) {

  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProductsByPage(this.page.pageNumber, this.page.pageSize).subscribe({
      next: (response: ProductPage) => {
        console.log(response);
        this.page = response;
        this.products = response.data.map(product => {
            let pro = new Product(
              product.sku,
              product.title,
              product.description,
              product.price,
              product.imageUrl,
              product.category,
              product.brand,
              "",
              0
            )
            this.storeService.getProductStock(pro.sku).subscribe(
              {
                next: (res: ProductStock) => {
                  console.log(res);
                  pro.stock = (res == null) ? 0 : res.quantity;
                  pro.inventoryStatus = getStockStatus(pro.stock);
                },
                error: (err) => {
                  pro.stock = 0;
                  pro.inventoryStatus = getStockStatus(pro.stock);
                  console.log('Error when request to get stock value')
                  console.log(err)
                }
              });
            // pro.stock = this.storeService.getProductStock(pro.sku).;
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
    return product.sku;
  }

  removeProduct(sku: string) {
    this.products = this.products.filter(product => product.sku != sku);
  }
}

function getStockStatus(stock: number): string {
  if (stock === 0) {
    return "OUT_OF_STOCK";
  } else if (stock <= 5) {
    return "LOW_STOCK";
  } else {
    return "IN_STOCK";
  }
}

