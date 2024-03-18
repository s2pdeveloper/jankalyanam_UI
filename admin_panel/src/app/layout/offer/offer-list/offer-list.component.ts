import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OfferService } from '../../../services/offer/offer.service';


@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {

  selectedRow: any = {};
  offerArr: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: any;


  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private offerService: OfferService
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

    this.offerService
      .getAll(obj)
      .subscribe((success) => {
        console.log("success", success);
        this.offerArr = success.rows;
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
    this.offerService
      .delete(this.selectedRow.id).subscribe(
        (success: any) => {
          console.log("success", success);
          this.toastService.success(" Offer Deleted Successfully !!");
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
