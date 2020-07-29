import { Product } from "./../../interfaces/product";
import { CartsService } from "./../../services/carts.service";
import { ProductsService } from "./../../services/products.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  constructor(
    private ProductsService: ProductsService,
    private CartsService: CartsService
  ) {}

  @Input() product: Product;

  units: number = 1;

  ngOnInit() {}
  hideInfo() {
    this.ProductsService.isOpen(false);
  }
  getValue(e) {
    console.log(e.target.value);
    this.units = e.target.value;
  }
  addProuct() {
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
  up() {
    this.units++;
  }
  down() {
    if (this.units < 2) return;
    this.units--;
  }
}
