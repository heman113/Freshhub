import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product:Product;
  @Input('cart') cart: Cart;
  constructor(private cartservice: CartService) { }

  addToCart() {
    this.cartservice.addToCart(this.product);
    
  }


  ngOnInit(): void {
  }

}
