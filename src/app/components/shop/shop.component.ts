import { ProductsService } from "./../../services/products.service";
import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.css"],
})
export class ShopComponent implements OnInit {
  constructor(private ProductsService: ProductsService) {}
  isOpen = true;

  categories: [] = [];

  ngOnInit() {
    this.ProductsService.getCategories()
      .pipe(
        map((result) => {
          this.categories = result;
        })
      )
      .subscribe();
  }

  menuButton() {
    this.isOpen = !this.isOpen;
  }
  getCategoryValue(category) {
    console.log(category);
    this.ProductsService.getProductsCategory(category.category_id);
  }
}
