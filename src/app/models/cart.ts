import { CartItem } from './cart-item';
import { Product } from './product';



export class Cart {
    items: CartItem[] = [];
    constructor(private itemsMap?: { [productId: string]: CartItem }) {
        this.itemsMap = itemsMap || {};
        for (let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new CartItem({
                ...item,

                key: productId
            }));
        }

    }

    getQuantity(product: Product) {
        if (this.itemsMap) {
            let item = this.itemsMap[product.key]
            return item ? item.quantity : 0;
        }
        else return 0;

    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap) {
            count += this.itemsMap[productId].quantity;
        }
        return count;
    }
}