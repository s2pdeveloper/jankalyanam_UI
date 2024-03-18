import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdvertiseService } from '../../../services/advertise/advertise.service';

@Component({
  selector: 'app-advertise-list',
  templateUrl: './advertise-list.component.html',
  styleUrls: ['./advertise-list.component.scss']
})
export class AdvertiseListComponent implements OnInit {

  selectedRow: any = {};
  advertiseArr: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: any;
  
  billType: any = [
    { label: 'LT', value: 'LT' },
    { label: 'HT', value: 'HT' },
  ];
  selectedBillType: string = '';
 
  consumerType:any = [
    { label: 'Industrial',value:'Industrial'},
    { label: 'Commercial',value:'Commercial'},
    { label: 'Residential',value:'Residential'},
    { label: 'Others',value:'Others'},
  ];
  
  selectedConsumerType: string = '';


  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private advertiseService: AdvertiseService
  ) { }




  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
    };

    this.advertiseService
 .getAll(obj)
      .subscribe((success) => {
        console.log("success",success);
        
        this.advertiseArr = success.rows;
        this.collection = success.count;
        this.spinner.hide();
      });
  }

  navigateTo(path, id) {
    if (id) {
      this.router.navigate([path], { queryParams: { id } });
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


  delete() {
    this.spinner.show();
    this.advertiseService
     .delete(this.selectedRow.id).subscribe(
        (success: any) => {
          console.log("success", success);
          this.toastService.success(" Advertise Deleted Successfully !!");
          this.modalService.dismissAll();
          this.spinner.hide();
          this.getAll();
        },
        (error: any) => {
          console.log("error", error);

        }
      )
  }


}
