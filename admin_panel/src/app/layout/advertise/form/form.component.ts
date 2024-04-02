import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../core/components';
import { UserService } from '../../../services/users/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdvertiseService } from '../../../services/advertise/advertise.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  submitted = false;
  file: any = [];
  advertiseForm = this.formBuilder.group({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    status: new FormControl('ACTIVE', [Validators.required]),
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
    private service: AdvertiseService
  ) {}

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      if (params.id) {
        this.getById(params.id);
      }
    });
  }

  submit() {
    this.submitted = true;
    // this.advertiseForm.controls.role.enable();

    if (this.file.length <= 0) {
      this.toastService.warning('Please Upload Image !');
      return;
    }
    if (this.advertiseForm.invalid) {
      this.toastService.warning('Please fill all required field !');
      return;
    }
    let formData = this.advertiseForm.value;
    const fd = new FormData();

    if (this.file) {
      fd.append('name', this.form['name'].value);
      fd.append('file', this.file, this.file.name);
      fd.append('status', this.form['status'].value);
    }
    if (formData.id) {
      this.update(formData.id, fd);
    } else {
      delete formData.id;
      this.create(fd);
    }
  }

  create(formData) {
    this.spinner.show();
    this.service.create(formData).subscribe((success) => {
      this.spinner.hide();
      this.toastService.success(success.message);
      this.router.navigate(['advertise/list']);
    });
  }

  update(id, formData) {
    this.spinner.show();
    this.service.update(id, formData).subscribe((success) => {
      this.submitted = false;
      this.spinner.hide();
      this.toastService.success(success.message);
      this.router.navigate(['advertise/list']);
    });
  }

  getById(_id) {
    this.service.getById(_id).subscribe((success) => {
      this.advertiseForm.patchValue(success);
    });
  }

  goBack() {
    this.location.back();
  }

  fileBrowseHandler(event: any) {
    if (event.target.value) {
      if (event.target.files[0].size > 2000000) {
        this.toastService.warning(
          'Unable to upload image of size more than 2MB'
        );
        return;
      }
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onerror = (error) => {};
    }
  }
}
