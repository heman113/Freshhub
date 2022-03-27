import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { Order } from '../models/order';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private db: AngularFireDatabase,private cartService:CartService) { }

  getOrders() {
    return this.db.list('/orders').snapshotChanges().pipe(map(actions => {
      return actions.map(action => ({key: action.key, ...action.payload.val() as Order}));
    }))
  }

  getSingleOrder(id: string) {
    return this.db.object('/orders/' + id).valueChanges();
  }

  async placeOrder(order:Order) {
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrdersByUser(userId: string) {
    // return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges();
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges().pipe(map(actions => {
      return actions.map(action => ({key: action.key, ...action.payload.val() as Order}));
    }));
  }
}
