import { ProductsService } from "./../../services/products.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  constructor(private ProductsService: ProductsService) {}

  ngOnInit() {}
  getValue(e) {
    this.ProductsService.searchForProduct({ val: e.target.value });
    console.log(e.target.value);
  }
}
