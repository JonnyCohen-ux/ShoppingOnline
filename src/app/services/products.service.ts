import { tap, catchError, flatMap } from "rxjs/operators";
import {
  Subject,
  throwError,
  Observable,
  BehaviorSubject,
  VirtualTimeScheduler,
} from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  currentCategory;
  current = new Subject();

  private products: [];
  allProducts = new Subject();

  openPopUp = new BehaviorSubject<boolean>(true);

  getIsOpen() {
    return this.openPopUp.asObservable();
  }

  isOpen(status: boolean) {
    this.openPopUp.next(status);
  }

  // get categor
  getCurrentCategory() {
    return this.current.asObservable();
  }

  //Get all products
  getAllProducts() {
    return this.http.get("http://localhost:3000/products/allproducts");
  }

  getProductsCategory(currentCategory) {
    this.currentCategory = currentCategory;
    this.http
      .get(`http://localhost:3000/products/category/${currentCategory}`)
      .subscribe((data: []) => {
        console.log(data);
        this.currentCategory = data;
        this.current.next(this.currentCategory);
      });
  }
  getPhones() {
    return this.http.get(`http://localhost:3000/products/category/333`);
  }

  // Get categoires
  getCategories() {
    return this.http.get<[]>("http://localhost:3000/products/catogories").pipe(
      tap((result) => {
        console.log(result);
      })
    );
  }

  // Get product by search
  searchForProduct(letter?) {
    return this.http
      .post("http://localhost:3000/products/search", letter)
      .subscribe((data: []) => {
        this.products = data;
        this.allProducts.next(this.products);
      });
  }

  getProducts() {
    return this.allProducts.asObservable();
  }
}
