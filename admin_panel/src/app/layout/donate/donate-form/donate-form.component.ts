import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../core/components';
import { UserService } from '../../../services/users/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DonateService } from '@services/donate/donate.service';

@Component({
  selector: 'app-donate-form',
  templateUrl: './donate-form.component.html',
  styleUrls: ['./donate-form.component.scss'],
})
export class DonateFormComponent implements OnInit {
  submitted = false;
  Blood: any = {};
  showUserFields: boolean = false;
  bloodFormValues: any = {};
  showBloodForm: boolean = false;
  showUserForm: boolean = false;
  tabCondition: any = 'tab1';

  isBloodBankData: boolean = false;
  isPatientData: boolean = false;


  bloodForm=new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    age: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    mobileNo: new FormControl(''),
    hemoglobin: new FormControl(''),
    illness: new FormControl(''),
    bloodGroup: new FormControl(''),
    donationDate: new FormControl(''),
    gender: new FormControl(''),
    status: new FormControl(''),
    location: new FormControl(''),
    bloodBankName: new FormControl(''),
    user:new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      mobileNo: new FormControl(''),
      status: new FormControl(''),
      role: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    }),
    bloodRequest:new FormGroup({
      age:new FormControl(''),
      bloodGroup:new FormControl(''),
      bloodRequireDate:new FormControl(''),
      city:new FormControl(''),
      fatherOrHusband:new FormControl(''),
      gender:new FormControl(''),
      hemoglobin:new FormControl(''),
      illness:new FormControl(''),
      location:new FormControl(''),
      mobileNo:new FormControl(''),
      name:new FormControl(''),
      state:new FormControl(''),
      units:new FormControl(''),
    })
  })

  constructor(
    private spinner: NgxSpinnerService,
    private Donate: DonateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private validationService: ValidationService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      if (params.id) {
        this.getById(params.id);
      }
    });
  }
  
  get form() {
    return this.bloodForm.controls;
  }
  getById(id) {
    this.Donate.getById(id).subscribe((success) => {
      this.isPatientData = success.bloodRequest ? true : false;
      this.isBloodBankData = success.bloodBankName? true : false;
      this.bloodForm.patchValue(success);
      this.Blood = success;
    });
  }

  goBack() {
    this.location.back();
  }

  populateUserButton1(tab: any) {
    this.tabCondition = tab;
  }

  populateUserButton2(userFormValues: any) {
    this.showBloodForm = false;
    this.showUserForm = true;
  }
  submit(){
    
  }
}
// location 
// donationDate
// city
// we have to show 
