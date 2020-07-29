import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private http: HttpClient, private router: Router) {}

  addProduct(product) {
    console.log(product);
    let formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("image", product.image);
    console.log(formData);
    this.http
      .post("http://localhost:3000/products/addbyadmin", formData, {
        withCredentials: true,
      })
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(["/admin"]);
      });
  }
  editProduct(product) {
    console.log(product);
    let formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("image", product.image);
    formData.append("product_id", product.product_id);
    this.http
      .post("http://localhost:3000/products/editbyadmin", formData, {
        withCredentials: true,
      })
      .subscribe((data) => {
        console.log(data);
        console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      });
  }
}
