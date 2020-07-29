import { UsersService } from "./../../services/users.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  sub: Subscription;
  user = {
    username: "",
    isLog: false,
  };
  constructor(private UsersService: UsersService) {}

  ngOnInit() {
    this.UsersService.authUser().subscribe();
    this.UsersService.userLogStatus().subscribe((data) => {
      console.log(data);
      this.user.isLog = data["isLog"];
      this.user.username = data["username"];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  logout() {
    this.UsersService.onLogout().subscribe();
  }
}
