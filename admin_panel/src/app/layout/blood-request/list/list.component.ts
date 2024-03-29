import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/core/services';
import { BloodRequestService } from '../../../services/blood-request/donate.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: number = 0;
  userDetails: any = {};

  constructor(
    private service: BloodRequestService,
    private router: Router,
    private storageService: StorageService,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.userDetails = this.storageService.get('user');
    this.getAll();
  }

  getAll() {
    this.spinner.show();
    this.service
      .getAll()
      .subscribe((success) => {
        this.users = success.rows;
        this.collection = success.count;
        this.spinner.hide();
      });
  }

  navigateTo(path, _id) {
    if (_id) {
      this.router.navigate([path], { queryParams: { _id } });
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

  

}
