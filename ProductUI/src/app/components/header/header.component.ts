import {CommonModule} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  cartItemCount: number = 0;
  @Input() isAdmin: boolean = false;
  userImg = "https://www.fawry.com/wp-content/uploads/2022/07/hori-logo-small.png"

  constructor( private readonly cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }
}
