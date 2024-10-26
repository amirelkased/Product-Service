import {Component, OnInit} from '@angular/core';
import {Order} from '../../model/OrderResponse.model';
import {OrderService} from '../../services/order.service';
import {CommonModule, CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    NgIf,
    CommonModule,
    FormsModule,
    RouterLink
  ],
  providers: [OrderService],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders: Order[] | null = null;
  errorMessage: string | null = null;
  isLoading: boolean = true;

  constructor(private readonly orderService: OrderService,
              private readonly productService: ProductService) {

  }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getAllOrders(1900119).subscribe({
      next: (res) => {
        res.data.forEach(order => {
          order.orderItems.forEach(item => {
            console.log(`sku => ${item.productSku}`)
            this.getProductName(item.productSku).then(title => item.productSku = title);
            console.log(`item name => ${item.productSku}`)
          })
        });
        this.orders = res.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Could not load orders.'
        console.log(error.error.message)
        this.isLoading = false;
      },
      complete: () => console.log("Fetch orders completed")
    });
  }

  getProductName(productSku: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.productService.getProductById(productSku).subscribe({
        next: (res) => {
          console.log(res);
          resolve(res.title);
        },
        error: (err) => {
          console.log('error when fetching product in orders list');
          console.log(err);
        }
      });
    });
  }

}
