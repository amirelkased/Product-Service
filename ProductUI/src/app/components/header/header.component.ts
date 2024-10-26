import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {Router, RouterLink} from '@angular/router';

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
export class HeaderComponent {
  cartItemCount: number = 10;
  @Input() isAdmin: boolean = false;
  userImg = "https://www.fawry.com/wp-content/uploads/2022/07/hori-logo-small.png"

  constructor(private readonly router: Router) {

  }

  openCart() {
    this.router.navigate(['orders/cart'])
  }
}
