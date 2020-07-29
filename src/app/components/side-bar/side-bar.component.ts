import { CartsService } from "./../../services/carts.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.css"],
})
export class SideBarComponent implements OnInit {
  constructor(private CartsService: CartsService) {}
  userCart: [];
  totalPrice: number = 0;
  totalUnits: number = 0;
  emptyCart: boolean = false;

  ngOnInit() {
    this.CartsService.userCartProducts();
    this.CartsService.getCart().subscribe((data: []) => {
      this.userCart = data;
      this.totalPrice = this.CartsService.getTotalPrice();
      this.totalUnits = this.userCart.length;
      this.userCart.length > 0
        ? (this.emptyCart = false)
        : (this.emptyCart = true);
    });
  }

  deleteProduct(pro) {
    this.CartsService.deleteProduct({ id: pro.id });
    console.log(pro);
  }
}
