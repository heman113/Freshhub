import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  aflProducts: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) { }
  create(product: unknown){
    this.db.list('/products').push(product);
  }
  getAll(){
    this.aflProducts = this.db.list('/products');
    return this.aflProducts
    .snapshotChanges()
    .pipe(map(changes => changes
    .map(c => ({ key: c.payload.key, ...c.payload.val() }))));
  }

  
}
