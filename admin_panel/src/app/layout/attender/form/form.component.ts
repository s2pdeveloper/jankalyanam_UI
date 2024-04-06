import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../core/components';
import { UserService } from '../../../services/users/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

user:any={};
  userForm = this.formBuilder.group({
    id: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      this.validationService.emailValidator,
    ]),
    city: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl({ value: 'ADMIN', disabled: true }, [
      Validators.required,
    ]),
    state:new FormControl('', [Validators.required]),
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
  ) { }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      if (params.id) {
        this.getById(params.id);
      }
    });
  }
  getById(id) {
    this.userService.profile(id).subscribe((success) => {
      // success.confirmPassword = success.password;
      this.userForm.patchValue(success);
      this.user=success
      // this.userForm.controls.role.disable();
    });
  }
  submit(){

  }

  goBack() {
    this.location.back();
  }

}
