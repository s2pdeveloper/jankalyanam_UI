import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalService } from "src/app/service/modal.service";
import { DonationDetailsComponent } from "src/app/shared/models/donation-details/donation-details.component";
import { BloodRequestService } from "src/app/service/request/request.service";
import { forkJoin } from "rxjs";
import { StorageService } from "src/app/core/services";
import { DonationHistoryComponent } from "src/app/shared/models/donation-history/donation-history.component";
import { LoaderService } from "src/app/core/services/loader.service";
import { BloodDonationService } from "src/app/service/donation/donation.service";
import { DATE_PIPE_DEFAULT_OPTIONS } from "@angular/common";
@Component({
  selector: "app-blood-donations",
  templateUrl: "./blood-donations.page.html",
  styleUrls: ["./blood-donations.page.scss"],
})
export class BloodDonationsPage implements OnInit {
  activeSegment = "latest";
  currentTitle = "history";
  historyTabDetails: any = [];
  latestTabDetails: any = [];
  user: any = {};
  page:number = 0;
  pageSize:number =10;
  search:any=''
  type:any='';
  sortBy:any='';

  constructor(
    private router: Router,
    private modalService: ModalService,
    private service: BloodDonationService,
    private localStorage: StorageService,
    private spinner: LoaderService
  ) {}

  ngOnInit() {
    this.user = this.localStorage.get("user");
    if (this.user.role == "ATTENDER") {
      this.getAllAttenderList();
    }
    if (this.user.role == "ADMIN") {
      this.getAllAdminList();
    }

  }
  navigateTo(url: string) {
    console.log(url);
    this.router.navigate([url]);
  }

  async getAllAttenderList() {
    await this.spinner.showLoader();
    let params ={
      pageNo:this.page,
      pageSize:this.pageSize,
      search: this.search,
      sortBy: this.sortBy
    }
    forkJoin([
      this.service.getAllAttenderList(params,"HISTORY"),
      this.service.getAllAttenderList(params,"ACTIVE"),
    ]).subscribe(async (res) => {
      this.historyTabDetails = res[0];
      this.latestTabDetails = res[1];
      await this.spinner.hideLoader();
    });
  }

  async getAllAdminList() {
    await this.spinner.showLoader();
    let params ={
      pageNo:this.page,
      pageSize:this.pageSize,
      search: this.search,
      sortBy: this.sortBy
    }
    forkJoin([
      this.service.getAllAdminList(params,"HISTORY"),
      this.service.getAllAdminList(params,"ACTIVE"),
    ]).subscribe(async (res) => {
      this.historyTabDetails = res[0];
      this.latestTabDetails = res[1];
      await this.spinner.hideLoader();
    });
  }
  openModel(key: string,data:any) {
 
  
    switch (key) {
      case "history":
        this.modalService.openModal(DonationHistoryComponent, { data :data });
        break;
      case "latest":
        this.modalService.openModal(DonationDetailsComponent, { data : data});
        break;
      default:
        break;
    }
  }
}
