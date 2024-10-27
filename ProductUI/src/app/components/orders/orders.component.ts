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
  startDate: string | null = null;
  endDate: string | null = null;

  constructor(private readonly orderService: OrderService,
              private readonly productService: ProductService) {

  }

  ngOnInit(): void {
    this.fetchOrders();
  }

  // fetchOrders(): void {
  //   const currentDate = new Date().toISOString().split('T')[0];
  //   let from = '';
  //   let to = '';
  //   if (this.startDate == null) {
  //     from = '1970-01-01';
  //   } else {
  //     from = this.startDate.toISOString();
  //   }
  //   if (this.endDate == null) {
  //     to = currentDate;
  //   } else {
  //     to = this.endDate.toISOString();
  //   }
  //   this.orderService.getAllOrders(1900119, from, to).subscribe({
  //     next: (res) => {
  //       res.data.forEach(order => {
  //         order.orderItems.forEach(item => {
  //           console.log(`sku => ${item.productSku}`)
  //           this.getProductName(item.productSku).then(title => item.productSku = title);
  //           console.log(`item name => ${item.productSku}`)
  //         })
  //       });
  //       this.orders = res.data;
  //       this.isLoading = false;
  //     },
  //     error: (error) => {
  //       this.errorMessage = 'Could not load orders.'
  //       console.log(error.error.message)
  //       this.isLoading = false;
  //     },
  //     complete: () => console.log("Fetch orders completed")
  //   });
  // }

  // Main function to fetch orders
  fetchOrders(): void {
    const from = this.formatDate(this.startDate, '1970-01-01');
    const to = this.formatDate(this.endDate, new Date().toISOString().split('T')[0]);

    this.getOrdersFromService(from, to);
  }

// Function to format dates, defaults to specified value if date is null
  private formatDate(date: string | null, defaultDate: string): string {
    return date ? new Date(date).toISOString().split('T')[0] : defaultDate;
  }

// Function to fetch orders from the API
  private getOrdersFromService(from: string, to: string): void {
    this.orderService.getAllOrders(1900119, from, to).subscribe({
      next: (res) => this.processOrders(res.data),
      error: (error) => this.handleError(error),
      complete: () => console.log("Fetch orders completed")
    });
  }

// Function to process orders data and retrieve product names
  private processOrders(ordersData: Order[]): void {
    ordersData.forEach(order => {
      order.orderItems.forEach(item => {
        console.log(`sku => ${item.productSku}`);
        this.getProductName(item.productSku).then(title => item.productSku = title);
        console.log(`item name => ${item.productSku}`);
      });
    });
    this.orders = ordersData;
    this.isLoading = false;
  }

// Function to handle errors
  private handleError(error: any): void {
    this.errorMessage = 'Could not load orders.';
    console.log(error.error.message);
    this.isLoading = false;
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
