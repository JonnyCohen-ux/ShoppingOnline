import { CartsService } from "./../../services/carts.service";
import { Product } from "./../../interfaces/product";
import { ProductsService } from "./../../services/products.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.css"],
})
export class PopupComponent implements OnInit {
  constructor(
    private ProductsService: ProductsService,
    private CartsService: CartsService
  ) {}

  @Input() product: Product;

  units: number = 1;

  ngOnInit() {}
  getValue(e) {
    console.log(e.target.value);
    this.units = e.target.value;
  }
  hideInfo() {
    this.ProductsService.isOpen(false);
  }
  hidePopup() {
    if (isNaN(+this.units)) {
      alert("Only Numbers allowed");
      return;
    }
    let productToAdd = {
      product_identify: this.product.product_id,
      quantity: this.units,
      total_price: this.units * this.product.product_price,
      c_product_image: this.product.product_img,
    };

    this.CartsService.addPorductToUserCart(productToAdd);
    this.units = 1;
    this.CartsService.userCartProducts();
    this.CartsService.getCart().subscribe();
    this.product.quantity = +this.units;
    this.ProductsService.isOpen(false);
  }
}
