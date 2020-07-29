import { Router } from "@angular/router";
import { UsersService } from "./users.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UsersService, private router: Router) {}

  canActivate() {
    return this.userService.authUser().pipe(
      map((result) => {
        console.log(result);
        if (result.isAdmin) {
          return true;
        }
        this.router.navigate(["/home"]);
      }),
      catchError((error) => {
        this.router.navigate(["/home"]);
        return of(error);
      })
    );
  }
}
