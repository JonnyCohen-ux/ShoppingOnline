import { Injectable } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class ValidationService {
  constructor() {}
  checkInputStatuss(input: AbstractControl) {
    if (input.invalid && input.touched) {
      return true;
    }
    return false;
  }
}
