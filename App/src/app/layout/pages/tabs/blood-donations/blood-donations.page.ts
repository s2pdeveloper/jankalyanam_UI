import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalService } from "src/app/service/modal.service";
import { DonationDetailsComponent } from "src/app/shared/models/donation-details/donation-details.component";
import { BloodRequestService } from "src/app/service/request/request.service";
import { forkJoin } from "rxjs";
import { StorageService, ToastService } from "src/app/core/services";
import { DonationHistoryComponent } from "src/app/shared/models/donation-history/donation-history.component";
import { LoaderService } from "src/app/core/services/loader.service";
import { BloodDonationService } from "src/app/service/donation/donation.service";
import { DATE_PIPE_DEFAULT_OPTIONS } from "@angular/common";
@Component({
  selector: "app-blood-donations",
  templateUrl: "./blood-donations.page.html",
  styleUrls: ["./blood-donations.page.scss"],
})
export class BloodDonationsPage implements OnInit, OnDestroy {
  activeSegment = "latest";
  currentTitle = "history";
  historyTabDetails: any = [];
  latestTabDetails: any = [];
  user: any = {};
  page: number = 0;
  pageSize: number = 10;
  search: any = "";
  type: any = "";
  sortBy: any = "";
  count: number = 0;
  loader = true;
  constructor(
    private router: Router,
    private modalService: ModalService,
    private service: BloodDonationService,
    private localStorage: StorageService,
    private spinner: LoaderService,
    private toast: ToastService
  ) {}

  ngOnInit() {}


  ionViewWillEnter() {
    this.user = this.localStorage.get("user");
    if (this.user.role == "ATTENDER") {
      this.getAllAttenderList("ACTIVE");
      this.getAllAttenderList("HISTORY");
    } else if (this.user.role == "ADMIN") {
      this.getAllAdminList("ACTIVE");
      this.getAllAdminList("HISTORY");
    }
  }
  navigateTo(url: string) {
    console.log(url);
    this.router.navigate([url]);
  }
  ngOnDestroy(): void {
    console.log("destroy------------1");
  }

  async getAllAttenderList(status: any, event = null) {

      this.loader = true;
      let params = {
        pageNo: this.page,
        pageSize: this.pageSize,
        search: this.search,
        sortBy: this.sortBy,
      };

      this.service.getAllAttenderList(params, status).subscribe(
        
        async (res) => {
          if (status === "HISTORY") {
            if (event) {
              this.historyTabDetails = [...this.historyTabDetails, ...res.data];
            } else {
              this.historyTabDetails = res.data;
              console.log("-------", this.historyTabDetails)
            }
          } else {
            if (event) {
              this.latestTabDetails = [...this.latestTabDetails, ...res.data];
            } else {
              this.latestTabDetails = res.data;
              console.log("this.latestTabDetails", this.latestTabDetails);
            }
          }
          this.count = res.count;
       
          if (res?.data.length === 0 && event) {
            event.target.disabled = true;
          }
          this.loader = false;
          
        },
        
        async (error) => {
          this.loader = false;
          this.toast.errorToast("Something went wrong!");
        }
        
      );
     
    
  }

  async getAllAdminList(status: any, event = null) {
   
    this.loader = true;
    let params = {
      pageNo: this.page,
      pageSize: this.pageSize,
      search: this.search,
      sortBy: this.sortBy,
    };
    this.service.getAllAdminList(params, status).subscribe(
      async (res) => {
        if (status == "HISTORY") {
          if (event) {
            this.historyTabDetails = [...this.historyTabDetails, ...res.data];
          } else {
            this.historyTabDetails = res.data;
            console.log("Admin", this.historyTabDetails)
          }
        } else {
          if (event) {
            this.latestTabDetails = [...this.latestTabDetails, ...res.data];
          } else {
            this.latestTabDetails = res.data;
            console.log("this.latestTabDetails", this.latestTabDetails);
          }
        }
        this.count = res.count;

        if (res?.data.length === 0 && event) {
          event.target.disabled = true;
        }

       
        this.loader = false;
      },
      async (error) => {
       
        this.loader = false;
        this.toast.errorToast("Something went wrong!");
      }
    );
  }
  // async getAllAdminList() {
  //   await this.spinner.showLoader();
  //   let params ={
  //     pageNo:this.page,
  //     pageSize:this.pageSize,
  //     search: this.search,
  //     sortBy: this.sortBy
  //   }
  //   forkJoin([
  //     this.service.getAllAdminList(params,"HISTORY"),
  //     this.service.getAllAdminList(params,"ACTIVE"),
  //   ]).subscribe(async (res) => {
  //     this.historyTabDetails = res[0];
  //     this.latestTabDetails = res[1];
  //     await this.spinner.hideLoader();
  //   },async (error) =>{
  //     await this.spinner.hideLoader();
  //     this.toast.errorToast("Something went wrong!");
  //   });
  // }
  openModel(key: string, data: any) {
    switch (key) {
      case "history":
        this.modalService.openModal(DonationHistoryComponent, { data: data });
        break;
      case "latest":
        this.modalService.openModal(DonationDetailsComponent, { data: data });
        break;
      default:
        break;
    }
  }

  doInfinite(event) {
    console.log("doInfinite", event);

    if (this.activeSegment == "latest") {
      if (this.count == this.latestTabDetails.length) {
        event.target.complete();
        return;
      }
      if (this.user.role == "ADMIN") {
        this.getAllAdminList("ACTIVE", event);
      } else {
        this.getAllAttenderList("ACTIVE", event);
      }
    } else {
      if (this.count == this.historyTabDetails.length) {
        event.target.complete();
        return;
      }

      if (this.user.role == "ADMIN") {
        this.getAllAdminList("HISTORY", event);
      } else {
        this.getAllAttenderList("HISTORY", event);
      }
    }
    this.page++;
    event.target.complete();
  }
  segmentChange(ev) {
    // console.log("ev",ev);
    // this.page=1;
    // if(this.activeSegment=='latest'){
    //   if(this.user.role == 'ADMIN'){
    //     this.getAllAdminList('ACTIVE');
    //   }else{
    //     this.getAllAttenderList('ACTIVE');
    //   }
    // }else{
    //   if(this.user.role == 'ADMIN'){
    //     this.getAllAdminList('HISTORY');
    //   }else{
    //     this.getAllAttenderList('HISTORY');
    //   }
    // }
  }
  
  close(id : any,index : number){
    this.loader = true;
    this.service.statusUpdate(id, 'CLOSE').subscribe(
      async (success) => {
        this.toast.successToast(success.message);

       let data =  this.latestTabDetails(index);
       this.latestTabDetails.splice(index,1);
       this.historyTabDetails.unshift(data);
        this.loader = false;
      },
      async (error: any) => {
        this.loader = false;
        this.toast.errorToast(error.error);
      }
    );
  
  }
}
