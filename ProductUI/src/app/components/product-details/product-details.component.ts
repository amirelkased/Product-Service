import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductForm} from '../../model/Product.model';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css',
    './product-details.component.scss'
  ]
})
export class ProductDetailsComponent {
  @Input() product: ProductForm | null = null;
  isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Input() isOpen: boolean = false;

  closeOverlay() {
    this.isOpen = false;
    this.close.emit();
  }

  ngOnChanges() {
    this.isVisible = !!this.product;
  }

  openOverlay() {
    this.isVisible = true;
  }
}
