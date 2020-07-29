import { Router } from "@angular/router";
import { AdminService } from "./../../services/admin.service";
import { ValidationService } from "./../../services/validation.service";
import { Validators, FormGroup } from "@angular/forms";
import { FormBuilder, Form } from "@angular/forms";
import { ProductsService } from "./../../services/products.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  constructor(
    private ProductsService: ProductsService,
    private ValidationService: ValidationService,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {}
  productToChange;
  productForm: FormGroup;
  myForm: FormGroup;
  img;
  myProduct;
  mode: string = "Add";
  imageURL: string;
  product_id;

  currentCategory;
  products: [];
  editCall: boolean = false;
  categories = [
    { value: 111, category: "Laptop" },
    { value: 222, category: "TV" },
    { value: 333, category: "Smartphone" },
    { value: 444, category: " Headphones" },
    { value: 555, category: "smartWatch" },
  ];
  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ["", Validators.required],
      category: ["", Validators.required],
      price: ["", Validators.required],
      image: ["", Validators.required],
    });
    this.searchByName();
    this.ProductsService.getCurrentCategory().subscribe((data: []) => {
      this.products = data;
    });
  }

  onUpload(event: any) {
    console.log(event.target.value);
    const imageFile = event.target.files[0];
    this.imageURL = imageFile.name;
    this.productForm.patchValue({
      image: imageFile,
    });
  }
  addMode() {
    this.mode = "Add";
    this.productForm.setValue({
      name: "",
      category: "",
      price: "",
      image: "",
    });
    this.imageURL = "";
  }

  getCategory(cat) {
    console.log(cat.value);
    this.currentCategory = cat.value;
    this.getProducts();
  }

  onSaveProduct() {
    if (this.productForm.valid) {
      let myProduct = {
        name: this.productForm.value.name,
        category: this.productForm.value.category,
        price: this.productForm.value.price,
        image: this.productForm.value.image,
        product_id: this.product_id,
      };

      this.mode == "Add"
        ? this.adminService.addProduct(myProduct)
        : this.adminService.editProduct(myProduct);
      this.ProductsService.searchForProduct();
      this.searchByName();
    } else {
      this.validateAll(this.productForm, 4);
      return;
    }
  }
  editProduct(pro) {
    this.productToChange = pro;
    this.mode = "Edit";
    console.log(pro);
    this.productForm.setValue({
      name: this.productToChange["product_name"],
      category: this.productToChange["category_id"],
      price: this.productToChange["product_price"],
      image: this.productToChange["product_img"],
    });
    console.log(this.productToChange.product_img);

    this.product_id = this.productToChange["product_id"];
    this.imageURL = this.productToChange["product_img"];
  }
  getProducts() {
    this.ProductsService.getProductsCategory(this.currentCategory);
  }

  checkValidation(input) {
    return this.ValidationService.checkInputStatuss(input);
  }
  get fromControlers() {
    return this.productForm.controls;
  }

  searchByName() {
    this.ProductsService.getProducts().subscribe((data: []) => {
      this.products = data;
    });
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
