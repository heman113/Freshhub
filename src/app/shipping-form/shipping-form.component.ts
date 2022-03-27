import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from '../models/cart';
import { Order } from '../models/order';
import { AuthService } from '../services/auth.service';
import { OrderServiceService } from '../services/order-service.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {

  @Input('cart') cart: Cart;
  shipping = {};
  userId: string;
  userSub: Subscription;

  constructor( private orderService: OrderServiceService,
    private authService: AuthService,
    private router: Router) { }

  async ngOnInit(){
    this.userSub = this.authService.user$.subscribe(user => {
      if(user) this.userId = user.uid 
    } );
  }
  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart, this.cart.totalPrice);
    let result = await this.orderService.placeOrder(order);

    this.router.navigate(['/ordersuccess', result.key]);
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
