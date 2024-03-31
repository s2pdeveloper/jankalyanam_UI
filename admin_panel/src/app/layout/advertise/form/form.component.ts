import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../core/components';
import { UserService } from '../../../services/users/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdvertiseService } from '../../../services/advertise/advertise.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  submitted = false;
  advertiseForm = this.formBuilder.group({
    _id: new FormControl(''),
    name: new FormControl(''),
    status: new FormControl(''),
    file: new FormControl(''),
  });

  get form() {
    return this.advertiseForm.controls;
  }

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private validationService: ValidationService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private advertiseService: AdvertiseService
  ) { }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      if (params._id) {
        this.getById(params._id);
      }
    });
  }

  submit() {
    this.submitted = true;
    this.advertiseForm.controls.role.enable();
    if (this.advertiseForm.invalid) {
      this.toastService.warning('Please fill all required field !');
      return;
    }
    let formData = this.advertiseForm.value;
    if (formData._id) {
      this.update(formData);
    } else {
      delete formData._id;
      this.create(formData);
    }
  }

  create(formData) {
    this.spinner.show();
    this.advertiseService.create(formData).subscribe((success) => {
      this.spinner.hide();
      this.toastService.success(success.message);
      this.router.navigate(['users/users']);
    });
  }

  update(formData) {
    this.spinner.show();
    this.advertiseService.update(formData._id, formData).subscribe((success) => {
      this.submitted = false;
      this.spinner.hide();
      this.toastService.success(success.message);
      this.router.navigate(['users/users']);
    });
  }

  getById(_id) {
    this.advertiseService.getById(_id).subscribe((success) => {
      this.advertiseForm.patchValue(success);
    });
  }

  goBack() {
    this.location.back();
  }
}
