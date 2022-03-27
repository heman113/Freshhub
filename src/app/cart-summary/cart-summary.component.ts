import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../models/cart';

@Component({
  selector: 'cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  @Input('cart') cart: Cart;
  constructor() { }

  ngOnInit(): void {
  }
}
