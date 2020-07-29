import { ValidationService } from "./../../services/validation.service";
import { UsersService } from "./../../services/users.service";
import { Component, OnInit } from "@angular/core";
import { MustMatch } from "../../services/must-match";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerFrom: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private ValidationService: ValidationService,
    private UsersService: UsersService
  ) {}
  swipeIsOpen: boolean = false;
  errorMessege: string;
  registerCall: boolean;
  registerCities = ["Jerusalem", "Tel Aviv", "Haifa", "Eilat", "Beer Sheva"];
  ngOnInit() {
    this.registerFrom = this.formBuilder.group(
      {
        user_id: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, this.passwordVali]],
        confirm_password: ["", [Validators.required, this.passwordVali]],
        city: ["", Validators.required],
        street: ["", Validators.required],
        first_name: ["", Validators.required],
        last_name: ["", Validators.required],
      },
      {
        validator: MustMatch("password", "confirm_password"),
      }
    );
  }
  swipe() {
    console.log(this.registerFrom.controls);
    this.validateAll(this.registerFrom, 3);
    const {
      user_id,
      email,
      password,
      confirm_password,
    } = this.registerFrom.controls;
    if (
      user_id.valid &&
      email.valid &&
      password.valid &&
      confirm_password.valid
    ) {
      const userId = this.registerFrom.value.user_id;
      const email = this.registerFrom.value.email;
      this.UsersService.checkUserExsit(email, userId).subscribe(
        (result) => {
          this.errorMessege = "";
          return (this.swipeIsOpen = !this.swipeIsOpen);
        },
        (error) => {
          this.errorMessege = error.error.message;
          console.log(error);
        }
      );
    } else {
      return;
    }
  }

  sendSubmit() {
    if (this.registerFrom.valid) {
      console.log(this.registerFrom.value);
      this.UsersService.onRegister(this.registerFrom.value).subscribe((res) => {
        console.log(res);
      });
      this.registerFrom.reset();
    } else {
      this.validateAll(this.registerFrom, 7);
      return;
    }
  }

  passwordVali(input) {
    if (input.value.length < 6 && input.value.length > 0) {
      return {
        passwordVali: true,
      };
    }
    return null;
  }

  checkValidation(input) {
    return this.ValidationService.checkInputStatuss(input);
  }

  get fromControlers() {
    return this.registerFrom.controls;
  }
  callRegister() {
    this.registerCall = false;
    this.UsersService.webRegister = this.registerCall;
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
}
