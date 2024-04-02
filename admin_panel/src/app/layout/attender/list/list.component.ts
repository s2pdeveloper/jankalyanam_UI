import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/core/services';
import { UserService } from '../../../services/users/user.service';
import { IUser } from '@interfaces/index';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  selectedRow: any = {};
  users: any = [];
  search: any = '';
  page =1;
  pageSize = 10;
  collection: number = 0;
  // pages: number = 1;
  userDetails: any = {};

  constructor(
    private userService: UserService,
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
    let params ={
      page:this.page-1,
      pageSize:this.pageSize,
      search:this.search
    }
    this.userService
      .getAllAttenderUsers(params)
      .subscribe((success) => {
        this.users = success.data;
        this.collection = success.count; 
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

  deleteUser(id) {
    this.userService.deleteUser(id).subscribe(
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
