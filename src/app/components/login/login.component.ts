import { Router } from "@angular/router";
import { ValidationService } from "./../../services/validation.service";
import { User } from "./../../interfaces/user";
import { UsersService } from "./../../services/users.service";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private UsersService: UsersService,
    private ValidationService: ValidationService,
    private router: Router
  ) {}
  form: FormGroup;
  errorMessage: string;
  currentUser: User;
  regiser: boolean = false;

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  checkInputStatus(input: AbstractControl) {
    return this.ValidationService.checkInputStatuss(input);
  }
  errorMsg() {
    this.errorMessage = "";
  }
  login() {
    this.errorMessage = "";
    if (this.form.invalid) {
      this.errorMessage = "Please fill the from";
      return;
    }

    this.UsersService.onLogIn(this.form.value).subscribe(
      (res) => {
        this.UsersService.authUser().subscribe((result) => {
          if (result.isLog) {
            this.router.navigate(["/admin"]);
          }
        });
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }
  callRegister() {
    this.regiser = true;
    this.UsersService.webRegister = this.regiser;
  }

  get fromControlers() {
    return this.form.controls;
  }
}
