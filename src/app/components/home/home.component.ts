import { CartsService } from "./../../services/carts.service";
import { UsersService } from "./../../services/users.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  isLog: boolean;
  buttonMessege: string = "Please login to active the button";
  shopButton: string = "Start Shopping";
  userNmae;
  cartCheck: [] = [];

  constructor(
    private UsersService: UsersService,
    private router: Router,
    private CartsService: CartsService
  ) {}
  ngOnInit() {
    this.UsersService.authUser().subscribe(
      () => {},
      (error) => {
        console.log(error);
      }
    );

    this.UsersService.userLogStatus().subscribe((data) => {
      console.log(data, "HOME COMPONENT");
      this.isLog = data["isLog"];
      this.userNmae = data["username"];

      this.CartsService.userCartProducts();
      this.CartsService.getCart().subscribe((data: []) => {
        this.cartCheck = data;
      });
    });
  }

  register() {
    return this.UsersService.webRegister;
  }

  startShop() {
    this.UsersService.authUser().subscribe((data) => {
      if (!data["isAdmin"]) {
        this.router.navigate(["/shop"]);
      } else {
        this.router.navigate(["/admin"]);
      }
    });
  }
}
