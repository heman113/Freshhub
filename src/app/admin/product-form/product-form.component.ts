import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product: any = {};
  
  constructor(public categoryService: CategoryService,private productService: ProductService, private router: Router,private route: ActivatedRoute) {
    this.categories$ = categoryService.getCategories();

   }

  save(product: unknown){
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
  ngOnInit(): void {
  }

}
