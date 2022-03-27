import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardService } from './services/auth-guard.service';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import {DataTablesModule} from 'angular-datatables';
import { CategoriesComponent } from './categories/categories.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    SignupComponent,
    ProductFormComponent,
    CategoriesComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShippingFormComponent,
    CartSummaryComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    RouterModule.forRoot([
      {path:'',component:HomeComponent},
      {path:'login',component:LoginComponent},
      {path:'products',component:ProductsComponent},
      {path:'cart',component:ShoppingCartComponent},
      {path:'categories',component:CategoriesComponent},
      {path:'signup',component:SignupComponent},
      {path:'checkout',component:CheckOutComponent, canActivate:[AuthGuardService]},
      {path:'shippingform',component:CheckOutComponent, canActivate:[AuthGuardService]},
      {path:'ordersuccess',component:OrderSuccessComponent, canActivate:[AuthGuardService]},
      {path:'myorders',component:MyOrdersComponent, canActivate:[AuthGuardService]},
      {path:'admin/products',component:AdminProductsComponent, canActivate:[AuthGuardService]},
      {path:'admin/products/new',component:ProductFormComponent, canActivate:[AuthGuardService]},
      {path:'admin/products/:id',component:ProductFormComponent, canActivate:[AuthGuardService]},
      {path:'admin/orders',component:AdminOrdersComponent, canActivate:[AuthGuardService]},
    ]),
    NgbModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
