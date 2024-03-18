import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EnquiryService } from '../../../services/enquiry/enquiry.service';

@Component({
  selector: 'app-enuiry',
  templateUrl: './enuiry.component.html',
  styleUrls: ['./enuiry.component.scss'],
})
export class EnuiryComponent implements OnInit {
  selectedRow: any = {};
  tableData: any = [];
  search: any = '';
  page = 1;
  pageSize = 10;
  collection: number = 0;
 

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private service: EnquiryService
  ) {}

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

    this.service.enquiryGetAll(obj).subscribe((success) => {
      console.log('success', success);
      this.tableData = success.rows;
      this.collection = success.count;
      this.spinner.hide();
    });
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
}
