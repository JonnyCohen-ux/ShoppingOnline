import { Login } from "./../interfaces/login";
import { User } from "./../interfaces/user";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { tap, catchError } from "rxjs/operators";
import { Subject, throwError, of } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class UsersService {
  url = "http://localhost:3000/users";

  webRegister: boolean = false;
  userIsLogged: any;
  private updateuserIsLogged = new Subject<any>();
  constructor(private http: HttpClient, private router: Router) {}

  userLogStatus() {
    return this.updateuserIsLogged.asObservable();
  }

  authUser() {
    return this.http
      .get<{ isLog: boolean; isAdmin: boolean }>(`${this.url}/auth/user`, {
        withCredentials: true,
      })
      .pipe(
        tap((result) => {
          console.log(result);
          this.userIsLogged = result;
          this.updateuserIsLogged.next(this.userIsLogged);
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  onLogIn(user: Login) {
    return this.http
      .post(`${this.url}/login`, user, { withCredentials: true })
      .pipe(
        tap((res) => {
          console.log(res);
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  onLogout() {
    return this.http.get(`${this.url}/logout`, { withCredentials: true }).pipe(
      tap((message) => {
        console.log(message);
        this.userIsLogged = {
          isLog: false,
          username: "",
        };
        this.updateuserIsLogged.next(this.userIsLogged);
      })
    );
  }

  checkUserExsit(email: string, userId: number) {
    const checkInfo = { email: email, userId: userId };
    return this.http.post(`${this.url}/userexist`, checkInfo).pipe(
      tap((result) => {
        console.log(result);
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  onRegister(user: User) {
    return this.http.post(`${this.url}/register`, user);
  }
}
