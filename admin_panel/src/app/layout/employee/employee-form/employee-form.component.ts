import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/core/services';
import { Location } from '@angular/common';
import { ValidationService } from 'src/app/core/components';
 

import {
  EmailValidator,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomerService } from '@services/customer/customer.service';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  organizationId : any = null;
  
  employeeForm = this.formBuilder.group(
    {
      id: new FormControl(''),
      organizationId:new FormControl(''),
    
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        this.validationService.emailValidator,
      ]),
      mobile: new FormControl('', [Validators.required]),
      role : new FormControl('Employee')
    },
  );

  fb: any;
  get form() {
    return this.employeeForm.controls;
  }

  constructor( private router: Router,
    private storageService: StorageService,
    private modalService: NgbModal,
    private location: Location,
    private actRoutes: ActivatedRoute,

    private CustomerService:CustomerService,
    private formBuilder:FormBuilder,
    private validationService: ValidationService,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      console.log(params);
      if(params.id){
        // this.organizationId = params.id
        this.form.organizationId.setValue(params.id)
        console.log(this.employeeForm.value);
        
        console.log("this.organizationId",this.organizationId);
      }
     
      
      
      });

     
    
  }
  createEmp(formData) {
    this.spinner.show();
    this.CustomerService.createEmp(this.employeeForm.value).subscribe((success) => {
      this.spinner.hide();
      this.toastService.success(success.message);
      this.router.navigate(['employee/employee-list']);
    });
  }
  

  navigateTo(path, _id) {
    if (_id) {
      this.router.navigate([path], { queryParams: { _id } });
    } else {
      this.router.navigate([path]);
    }
  }

  goBack() {
    this.location.back();
  }



}
