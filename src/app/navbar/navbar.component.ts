import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cart$: Observable<Cart>;
  constructor(public auth: AuthService, private cartService: CartService) {
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  logout() {
    this.auth.logout();
  }


}
