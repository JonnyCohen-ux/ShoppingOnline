import { Product } from "./../../interfaces/product";
import { ProductsService } from "./../../services/products.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  constructor(private ProductsService: ProductsService) {}
  isPopUp: boolean = false;
  currentCategory: [] = [];
  product: Product;
  totalPrice: number = 0;
  callInfo: boolean = false;
  ngOnInit() {
    this.ProductsService.getPhones().subscribe((data: []) => {
      this.currentCategory = data;
    });
    this.getUserFullCart();
    this.ProductsService.getProducts().subscribe((data: []) => {
      this.currentCategory = data;
    });
  }

  callPopUp(pro) {
    this.product = pro;
    console.log(this.product);

    this.ProductsService.isOpen(true);
    this.ProductsService.getIsOpen().subscribe((result) => {
      this.isPopUp = result;
    });
  }
  inforamtion(pro) {
    this.product = pro;
    console.log(this.product);
    this.ProductsService.isOpen(true);
    this.ProductsService.getIsOpen().subscribe((result) => {
      this.callInfo = result;
    });
  }

  getUserFullCart() {
    this.ProductsService.getCurrentCategory().subscribe((data: []) => {
      this.currentCategory = data;
      console.log(this.currentCategory);
    });
  }
}
