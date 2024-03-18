import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/core/services';
import { CustomerService } from '../../../services/customer/customer.service';
// import { ShopService } from '@services/shop/shop.service';
import { identifierName, ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {
  selectedRow: any = {};
  organization: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: number = 0;
  userDetails: any = {};
  allCustomers: any = [];
  customerId: any = [];
  userId: any;

  constructor(
    private actroute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private storageService: StorageService,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.actroute.queryParams.subscribe((queryParams) => {
      // console.log("queryParams----------->",queryParams);
      this.userId = queryParams
      console.log("this.userId ", this.userId);

    });
    this.userDetails = this.storageService.get('enerty');
    // console.log("this.userDetails------->",this.userDetails);
    // this.getAll();
    // this.getAllCustomer();

    this.actroute.queryParams.subscribe((params) => {
      if (params._id) {
        this.getById(params._id);
      }
      console.log("this.getById(params._id)------>", this.userId._id);
    });


  }

  // getAllCustomer(){
  //   this.spinner.show();  
  //   let params={
  //     // page: this.page,
  //     // pageSize: this.pageSize,
  //     // search: this.search,
  //     userId : this.userDetails._id,
  //   }
  //   console.log("params getAllCustomer------->",params);

  //   this.customerService.getAllCustomers(params)
  //     .subscribe((success) => {
  //       console.log("params=====",params);
  //       console.log("success",success);
  //       this.allCustomers = success.rows;
  //       this.collection = success.count;
  //       this.spinner.hide();
  //     });


  // }
  
  getAll() {
    this.spinner.show();
    let payload = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
    };
    this.customerService
      .getAll(payload).subscribe((success) => {
         this.organization = success.rows;
        this.collection = success.count;
        this.spinner.hide();
      });
  }
  // for moble app
  // getById(_id){
  //   this.spinner.show();  
  //   let params={
  //     id : this.customerId._id,
  //   }
  //   console.log("this.customerId._id------->",params);

  //   this.customerService.getCustomersDetailsById(params)
  //     .subscribe((success) => {
  //       console.log("success",success);

  //       this.customerId = success.rows;
  //       this.collection = success.count;
  //       console.log("this.customerId------>",this.customerId);

  //       this.spinner.hide();
  //     });



  getById(_id) {
    this.customerService.getCustomersDetailsById(_id).subscribe((success) => {
      success.confirmPassword = success.password;
      this.customerId.patchValue(success);
      this.customerId.controls.role.disable();
    })

  }

  navigateTo(path, _id) {
    if (_id) {
      this.router.navigate([path], { queryParams: { id:_id} });
    } else {
      this.router.navigate([path]);
    }
  }
  refreshList(title) {
    this.search = title == 'clear' ? '' : this.search;
    this.getAll();
  }
  onChangePage(pageNo) {
    if (pageNo > 0) {
      this.page = pageNo;
    }
    this.getAll();
  }

  open(u, content) {
    this.selectedRow = u;
    this.modalService.open(content, { centered: true });
  }

  delete(_id) {
    this.customerService.delete(_id).subscribe(
      (success) => {
        this.getAll();
        this.selectedRow = {};
        this.modalService.dismissAll();
        this.toastService.success(success.message);
      },
      (error) => {
        this.selectedRow = {};
        this.modalService.dismissAll();
      }
    );
  }
}
