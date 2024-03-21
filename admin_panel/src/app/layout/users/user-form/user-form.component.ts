import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../core/components';
import { UserService } from '../../../services/users/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  submitted = false;
  userForm = this.formBuilder.group({
    _id: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      this.validationService.emailValidator,
    ]),
    mobile: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl({ value: 'ADMIN', disabled: true }, [
      Validators.required,
    ]),
  });

  constructor(
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private validationService: ValidationService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      if (params._id) {
        this.getById(params._id);
      }
    });
  }
  get form() {
    return this.userForm.controls;
  }
  submit() {
    this.submitted = true;
    this.userForm.controls.role.enable();
    if (this.userForm.invalid) {
      this.toastService.warning('Please fill all required field !');
      return;
    }
    let formData = this.userForm.value;
    if (formData._id) {
      this.update(formData);
    } else {
      delete formData._id;
      this.create(formData);
    }
  }
  create(formData) {
    this.spinner.show();
    this.userService.createUser(formData).subscribe((success) => {
      this.spinner.hide();
      this.toastService.success(success.message);
      this.router.navigate(['users/users']);
    });
  }

  update(formData) {
    this.spinner.show();
    this.userService.updateUser(formData._id, formData).subscribe((success) => {
      this.submitted = false;
      this.spinner.hide();
      this.toastService.success(success.message);
      this.router.navigate(['users/users']);
    });
  }

  getById(_id) {
    this.userService.profile(_id).subscribe((success) => {
      success.confirmPassword = success.password;
      this.userForm.patchValue(success);
      this.userForm.controls.role.disable();
    });
  }

  goBack() {
    this.location.back();
  }
}
