import { Router } from "@angular/router";
import { UsersService } from "./../../services/users.service";
import { ValidationService } from "./../../services/validation.service";
import { DomSanitizer } from "@angular/platform-browser";

import { Order } from "./../../interfaces/order";
import { CartsService } from "./../../services/carts.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent implements OnInit {
  orderForm: FormGroup;
  order;
  user_identify;
  cart_identify;
  totalPrice;
  city: string = "";
  street: string = "";
  searched: boolean = false;
  tableAviable = true;
  fileUrl;
  info = "";
  orderMsg: boolean = false;
  zz;
  constructor(
    private CartsService: CartsService,
    private FormBuilder: FormBuilder,
    private ValidationService: ValidationService,
    private UsersService: UsersService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit() {
    this.UsersService.authUser().subscribe((data) => {
      this.user_identify = data["id"];
      this.cart_identify = data["cart_id"];
    });
    this.orderForm = new FormBuilder().group({
      shipping_city: ["", Validators.required],
      shipping_street: ["", Validators.required],
      shipping_date: ["", Validators.required],
      payment: ["", [Validators.required, this.paymnetLength]],
    });
    this.getOrder();
  }

  downloadOrder() {
    this.setOrderInfo();
    const blob = new Blob(
      [
        `${this.info}
        Total Price: ${this.totalPrice}
        `,
      ],
      {
        type: "application/octet-stream",
      }
    );
    console.log(this.info);
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      window.URL.createObjectURL(blob)
    );
  }

  setOrderInfo() {
    for (let i = 0; i < this.order.length; i++) {
      this.info += `
      ${this.order[i]["product_name"]}  units : ${this.order[i]["quantity"]} total : ${this.order[i]["total_price"]}
      `;
    }
    console.log(this.info);
  }
  setAdress() {
    this.UsersService.authUser().subscribe((data) => {
      this.orderForm.setValue({
        shipping_city: data["city"],
        shipping_street: data["street"],
        shipping_date: "",
        payment: "",
      });
    });
  }
  getOrder() {
    this.CartsService.userCartProducts();
    this.CartsService.getCart().subscribe((data: []) => {
      this.order = data;
      if (data.length < 1) {
        this.tableAviable = false;
      } else {
        this.tableAviable = true;
      }
      this.totalPrice = this.CartsService.getTotalPrice();
    });
  }
  paymnetLength(input) {
    if (input.value.length > 4 || input.value.length < 4) {
      return {
        paymnetLength: true,
      };
    }
    return null;
  }
  setOrder() {
    let order: Order = {
      user_identify: this.user_identify,
      cart_identify: this.cart_identify,
      final_price: this.totalPrice,
      shipping_city: this.orderForm.value.shipping_city,
      shipping_street: this.orderForm.value.shipping_street,
      shipping_date: this.orderForm.value.shipping_date,
      payment: this.orderForm.value.payment,
    };

    if (this.orderForm.valid && this.tableAviable) {
      this.orderMsg = true;
      this.CartsService.setOrder(order);
      this.CartsService.deleteDeliveredCart().subscribe();
      // this.orderForm.reset();
      this.downloadOrder();
      this.order = [];
      this.getOrder();
    } else if (!this.tableAviable) {
      alert("please add products into your cart first");
    } else {
      this.validateAll(this.orderForm, 4);
    }
  }

  checkValidation(input) {
    return this.ValidationService.checkInputStatuss(input);
  }
  get fromControlers() {
    return this.orderForm.controls;
  }

  validateAll(form: FormGroup, limit: number) {
    Object.keys(form.controls).forEach((inputName, index) => {
      const control = form.get(inputName);
      if (control.untouched && control.invalid) {
        if (index <= limit) {
          control.markAllAsTouched();
        }
      }
    });
  }
  navigateHome() {
    this.orderForm.reset();
    this.orderMsg = false;
  }
  getValue(e) {
    this.CartsService.productBySearch({ val: e.target.value }).subscribe(
      (data: []) => {
        this.order = data;
      }
    );
  }
  getOrderDetails() {}
}
