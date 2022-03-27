

export class CartItem {
 
  
  key: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;
  category: string;
  
  constructor(init?: Partial<CartItem>) {
    Object.assign(this, init);
     
  }
  

  get totalPrice() {
    return this.price * this.quantity;
  }

}