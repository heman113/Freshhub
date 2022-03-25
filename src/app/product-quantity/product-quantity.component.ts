import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product:Product;
  @Input('cart') cart: Cart;
  constructor(private cartservice: CartService) { }

  addToCart() {
    this.cartservice.addToCart(this.product);
    
  }

  removeFromCart(){
    this.cartservice.removeFromCart(this.product);
  }

  

  ngOnInit(): void {
  }

}
