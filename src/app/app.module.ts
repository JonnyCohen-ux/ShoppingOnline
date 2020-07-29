import { AuthGuard } from "./services/auth.guard";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AboutComponent } from "./components/about/about.component";
import { ShopComponent } from "./components/shop/shop.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import { ProductsComponent } from "./components/products/products.component";
import { ProductComponent } from "./components/product/product.component";
import { AdminComponent } from "./components/admin/admin.component";
import { SearchComponent } from "./components/search/search.component";
import { StoreDataComponent } from "./components/store-data/store-data.component";
import { PopupComponent } from "./components/popup/popup.component";
import { OrdersComponent } from "./components/orders/orders.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    ShopComponent,
    NavbarComponent,
    SideBarComponent,
    ProductsComponent,
    ProductComponent,
    AdminComponent,
    SearchComponent,
    StoreDataComponent,
    PopupComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
