import { tap, map } from "rxjs/operators";
import { Subject, pipe } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CartsService {
  constructor(private http: HttpClient) {}
  cartProduct: [];
  cartProducts = new Subject();
  private totalPrice: number;

  getTotalPrice() {
    return this.totalPrice;
  }
  // Get user cart products
  userCartProducts() {
    return this.http
      .get(`http://localhost:3000/cart/getproducts`, {
        withCredentials: true,
      })
      .pipe(
        map((data: []) => {
          console.log(data);

          this.totalPrice = 0;
          for (let i = 0; i < data.length; i++) {
            this.totalPrice += data[i]["total_price"];
          }
          return data;
        }),
        tap((data) => {
          this.cartProduct = data;
          this.cartProducts.next(this.cartProduct);
        })
      )
      .subscribe();
  }

  getCart() {
    return this.cartProducts.asObservable();
  }

  addPorductToUserCart(product) {
    return this.http
      .post("http://localhost:3000/cart/addproduct", product, {
        withCredentials: true,
      })
      .pipe(
        tap((result) => {
          this.userCartProducts();
        })
      )
      .subscribe();
  }

  productBySearch(letter) {
    return this.http.post("http://localhost:3000/cart/productsearch", letter, {
      withCredentials: true,
    });
  }

  // Delete product from the cart
  deleteProduct(product) {
    return this.http
      .post("http://localhost:3000/cart/delete", product, {
        withCredentials: true,
      })
      .subscribe((data) => {
        console.log(data);
        this.userCartProducts();
      });
  }

  deleteDeliveredCart() {
    return this.http
      .get("http://localhost:3000/cart/deleteDeliveredCart", {
        withCredentials: true,
      })
      .pipe(
        tap((data) => {
          console.log(data);
        })
      );
  }

  // Set Order
  setOrder(order) {
    return this.http
      .post("http://localhost:3000/cart/setorder", order, {
        withCredentials: true,
      })
      .pipe(
        tap((result) => {
          console.log(result);
        })
      )
      .subscribe();
  }

  // Get all Orders
  getOrders() {
    return this.http
      .get("http://localhost:3000/cart/getorders", { withCredentials: true })
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }
}
