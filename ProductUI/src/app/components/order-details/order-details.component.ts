import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Order} from '../../model/OrderResponse.model';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {
  order: Order | null = null;
  isLoading = true;
  errorMessage: string | null = null;
  customerId: number = 1900119;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly orderService: OrderService,
    private readonly productService: ProductService
  ) {
  }

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    if (orderId) {
      this.fetchOrder(orderId);
    }
  }

  fetchOrder(id: number): void {
    this.orderService.getOrderById(this.customerId, id).subscribe({
      next: (data) => {
        data.orderItems.forEach(item => {
          console.log(`sku => ${item.productSku}`)
          this.getProductName(item.productSku).then(title => item.productSku = title);
          console.log(`item name => ${item.productSku}`)
        })
        this.order = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Could not load order details.';
        this.isLoading = false;
        console.error(error);
      }
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
          reject(err);
        }
      });
    });
  }

}
