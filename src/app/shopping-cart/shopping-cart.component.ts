import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<Cart>;
  constructor(private cartService: CartService) { }

  async ngOnInit(){
    this.cart$ = await this.cartService.getCart();
  }
  clearCart() {
    this.cartService.clearCart();
  }
}
