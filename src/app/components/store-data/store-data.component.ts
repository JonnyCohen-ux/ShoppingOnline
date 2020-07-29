import { UsersService } from "./../../services/users.service";
import { CartsService } from "./../../services/carts.service";
import { ProductsService } from "./../../services/products.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-store-data",
  templateUrl: "./store-data.component.html",
  styleUrls: ["./store-data.component.css"],
})
export class StoreDataComponent implements OnInit {
  constructor(
    private ProductsService: ProductsService,
    private CartsService: CartsService,
    private UsersService: UsersService
  ) {}
  productsAmount: number;
  ordersAmount: number;
  userCartStatus: string;
  date: string;
  cartId;
  totalPrice;
  user: string;
  ngOnInit() {
    this.ProductsService.getAllProducts().subscribe((data: []) => {
      this.productsAmount = data.length;
    });
    this.UsersService.userLogStatus().subscribe((data: []) => {
      this.cartId = data["cart_id"];
      console.log(data);
      this.user = data["username"];
    });
    this.CartsService.getOrders().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i]["cart_identify"] == this.cartId) {
          this.date = data[i]["order_date"];
        }
      }
      console.log(data);
      this.ordersAmount = data.length;
    });
    this.CartsService.getCart().subscribe((data: []) => {
      if (this.date) {
        let cartShopDate = this.date.slice(0, 10);
        let date = new Date();
        let cartDate = `${date.getUTCFullYear()}-${
          date.getUTCMonth() + 1
        }-${date.getUTCDate()}`;
        this.totalPrice = this.CartsService.getTotalPrice();
        if (data.length > 0) {
          this.userCartStatus = `You got an open cart, Cart Total Price: ${this.totalPrice}$`;
        } else if (this.date == undefined) {
          this.userCartStatus = `Welcome ${this.user}`;
        } else if (data.length == 0) {
          this.userCartStatus = `Your last shop was at  ${cartShopDate}`;
        }
      }
    });
  }
}
