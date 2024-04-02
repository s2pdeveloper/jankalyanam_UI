import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/core/services';
import { UserService } from '../../../services/users/user.service';
import { AdvertiseService} from '../../../services/advertise/advertise.service'


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  selectedRow: any = {};
  tableData: any = [];
  search: any = '';
  page = 0;
  pageSize = 10;
  collection: number = 0;
  pages: number = 1;
  userDetails: any = {};

  constructor(
    private userService: UserService,
    private router: Router,
    private storageService: StorageService,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private service: AdvertiseService
  ) {}

  ngOnInit(): void {
    this.userDetails = this.storageService.get('user');
    this.getAll();
  }

  getAll() {
    this.spinner.show();
    let params ={
      page:this.page,
      pageSize:this.pageSize,
      search:this.search
    }
    this.service
      .getAll(params)
      .subscribe((success) => {
        this.tableData = success;
        // this.collection = success.count;
        this.pages = success.pages;
        this.spinner.hide();
      },
      (error) =>{
        this.spinner.hide();
        this.toastService.error("Something Went Wrong!");

      }
      );
  }

  navigateTo(path, id) {
    if (id) {
      this.router.navigate([path], { queryParams: { id:id } });
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

  deleteUser(id) {
    this.service.delete(id).subscribe(
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
