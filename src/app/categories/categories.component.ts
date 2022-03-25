import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Cart } from '../models/cart';

import { Product } from '../models/product';
import { CartService } from '../services/cart.service';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  products: Product[] = [];
  product: Product;
  filteredProducts: Product[];
  categories$;
  category: string | null;
  subscription: Subscription;
  cart$: Observable<Cart>;

  constructor(categoryService: CategoryService, private route: ActivatedRoute, private productService: ProductService,private cartService: CartService) {
    
    this.categories$ = categoryService.getCategories();

    
  }
  
  
 
  
  async ngOnInit(){
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }
  private populateProducts(){
    this.productService.getAll().subscribe(products => {
      this.products = products;
      return this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category')

        this.applyFilter();
      });
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
    
      this.products.filter(p => p.category === this.category) :
     
      this.products;

  }


}
