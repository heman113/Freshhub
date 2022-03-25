import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, SnapshotAction } from '@angular/fire/compat/database';
import { Product } from '../models/product';
import { map, take } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart():Promise<Observable<Cart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/carts/' + cartId).valueChanges().pipe(map((x:any) => {
      if (!x) { return new Cart(); }
      return new Cart(x.items);
    }))
      
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  removeFromCart(product:Product){
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/carts/' + cartId + '/items').remove();
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/carts/' + cartId + '/items/' + productId);
  }

  

  private async getOrCreateCartId(): Promise<any> {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let result = await this.create();
      localStorage.setItem('cartId', result.key??'');

      return result.key;

    }
    return cartId;

  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);


    item$.snapshotChanges().pipe(take(1)).subscribe((item:SnapshotAction<any>) => {
      let quantity = change;
      if (item.payload.exists()) {
        quantity = item.payload.val().quantity + change;
      }

      if (quantity === 0) { item$.remove(); }
      else {
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        });
      }
    });
  }

}
