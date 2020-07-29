import { User } from "./../interfaces/user";
import { map, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { UsersService } from "./users.service";
import { trimTrailingNulls } from "@angular/compiler/src/render3/view/util";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UsersService, private router: Router) {}
  canActivate() {
    return this.userService.authUser().pipe(
      map((result) => {
        if (result.isLog) {
          console.log("User is log");
          return true;
        }
      }),
      catchError((error) => {
        this.router.navigate(["/home"]);
        return of(error);
      })
    );
  }
}
