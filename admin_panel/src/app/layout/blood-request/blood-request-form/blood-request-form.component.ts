import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../core/components';
import { UserService } from '../../../services/users/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DonateService } from '@services/donate/donate.service';
import { BloodRequestService } from '@services/blood-request/blood-request.service';

@Component({
  selector: 'app-blood-request-form',
  templateUrl: './blood-request-form.component.html',
  styleUrls: ['./blood-request-form.component.scss']
})
export class BloodRequestFormComponent implements OnInit {
  submitted = false;
  tabCondition: any = 'tab1';
  isBloodBankData: boolean = false;
  isDonorData: boolean = false;
bloodReq=new FormGroup({
  age: new FormControl(''),
  bankCity: new FormControl(''),
  bankState: new FormControl(''),
  bloodBankName: new FormControl(''),
  bloodGroup: new FormControl(''),
  bloodRequireDate: new FormControl(''),
  city: new FormControl(''),
  fatherOrHusband: new FormControl(''),
  gender:new FormControl(''),
  hemoglobin: new FormControl(''),
  id: new FormControl(''),
  illness: new FormControl(''),
  location: new FormControl(''),
  mobileNo: new FormControl(''),
  name: new FormControl(''),
  provided: new FormControl(''),
  state: new FormControl(''),
  status: new FormControl(''),
  acceptor:new FormGroup({
    city: new FormControl(''),
    createdAt: new FormControl(''),
    email: new FormControl(''),
    firstName: new FormControl(''),
    id: new FormControl(''),
    lastName: new FormControl(''),
    mobileNo: new FormControl(''),
    role:new FormControl(''),
    state: new FormControl(''),
    status: new FormControl(''),
    token: new FormControl(''),
    updatedAt: new FormControl(''),
  }),
  attender:new FormGroup( {
    city: new FormControl(''),
    createdAt: new FormControl(''),
    email: new FormControl(''),
    firstName: new FormControl(''),
    id:new FormControl(''),
    lastName: new FormControl(''),
    mobileNo:new FormControl(''),
    role: new FormControl(''),
    state: new FormControl(''),
    status: new FormControl(''),
    token: new FormControl(''),
    updatedAt: new FormControl(''),
  }),
  donor:new FormGroup( {
age: new FormControl(''),
bloodGroup: new FormControl(''),
city: new FormControl(''),
donationDate: new FormControl(''),
gender: new FormControl(''),
hemoglobin: new FormControl(''),
illness: new FormControl(''),
mobileNo: new FormControl(''),
name: new FormControl(''),
state: new FormControl(''),
  })
})
  constructor(
    private spinner: NgxSpinnerService,
    private Blood: BloodRequestService,
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

  get form() {
    return this.bloodReq.controls;
  }
  getById(id) {
    this.Blood.getById(id).subscribe((success) => {
      this.isDonorData = success.donor ? true : false;
      this.isBloodBankData = success.bloodBankName? true : false;
      this.bloodReq.patchValue(success);
    });
  }
  goBack() {
    this.location.back();
  }
  populateUserButton1(tab: any) {
    this.tabCondition = tab;
  }

}
