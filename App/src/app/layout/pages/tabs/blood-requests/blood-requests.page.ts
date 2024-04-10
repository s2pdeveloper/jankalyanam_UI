import { Component, OnInit } from "@angular/core";
import { ModalService } from "src/app/service/modal.service";
import { DonationDetailsComponent } from "src/app/shared/models/donation-details/donation-details.component";
import { DonationHistoryComponent } from "src/app/shared/models/donation-history/donation-history.component";
import { BloodrequestMylistComponent } from "src/app/shared/models/bloodrequest-mylist/bloodrequest-mylist.component";
import { ActivatedRoute, Router } from "@angular/router";
import { BloodRequestService } from "src/app/service/request/request.service";
import { StorageService } from "src/app/core/services/local-storage.service";
import { LoaderService } from "src/app/core/services/loader.service";
import { ToastService } from "src/app/core/services/toast.service";
import { forkJoin } from "rxjs/internal/observable/forkJoin";
import { AdminRequestMylistComponent } from "src/app/shared/models/admin-request-mylist/admin-request-mylist.component";
import { AdminRequestActiveComponent } from "src/app/shared/models/admin-request-active/admin-request-active.component";
import { SessionStorageService } from "src/app/core/services/session-storage.service";
import { NoDataComponent } from "src/app/shared/models/no-data/no-data.component";
@Component({
  selector: "app-blood-requests",
  templateUrl: "./blood-requests.page.html",
  styleUrls: ["./blood-requests.page.scss"],
})
export class BloodRequestsPage implements OnInit {
  user: any = {};
  historyPage: number = 0;
  latestPage: number = 0;
  mylistPage: number = 0;
  pageSize: number = 10;
  search: any = "";
  type: any = "";
  sortBy: any = "";
  activeSegment = 'list';
  currentTitle = "history";
  historyTabDetails: any = [];
  latestTabDetails: any = [];
  myListTabDetails: any = [];
  historyCount: number = 0;
  latestCount: number = 0;
  myListCount: number = 0;
  // count: number = 0;
  loader = false;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private modalService: ModalService,
    private service: BloodRequestService,
    private localStorage: StorageService,
    private spinner: LoaderService,
    private toast: ToastService,
    private sessionStorage: SessionStorageService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    console.log("myListCount--",this.myListCount,this.latestPage);
    this.latestPage = 0;
    this.historyPage = 0;
    this.mylistPage = 0;
    this.user = this.localStorage.get("user");
    if (this.user.role == "ATTENDER") {
      this.activeSegment = "latest";
      this.getAllAttenderList("ACTIVE");
      this.getAllAttenderList("HISTORY");
    } else if (this.user.role == "ADMIN") {
      this.activeSegment = "list";
      this.getAllAdminList("MYLIST");
      this.getAllAdminList("ACTIVE");
      this.getAllAdminList("HISTORY");
    }

    this.activateRoute.queryParams.subscribe((params: any) => {
      if (params?.segment) {
        this.activeSegment = params.segment; 
      }
    });
  }

  navigateTo(url: string) {
    console.log(url);
    this.router.navigate([url]);
  }

  async accept(data: any, status: any) {
    this.loader = true;
    this.service.statusUpdate(data.id, status).subscribe(
      (res) => {
        data.status = status;
        data.acceptor.firstName = this.user.firstName;
        data.acceptor.lastName = this.user.lastName;
        this.getAllAdminList("MYLIST");
        console.log("Accepted");
        
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        this.toast.errorToast("Something went wrong!");
      }
    );
  }
  async getAllAttenderList(status: any, event = null) {
    this.loader = true;
    let params = {
      pageNo: status === "HISTORY" ? this.historyPage : this.latestPage,
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
            console.log("-------", this.historyTabDetails);
          }
          this.historyCount = res.count;
          this.historyPage++;
        } else {
          if (event) {
            this.latestTabDetails = [...this.latestTabDetails, ...res.data];
          } else {
            this.latestTabDetails = res.data;
            console.log("this.latestTabDetails", this.latestTabDetails);
          }
          this.latestCount = res.count;
          this.latestPage++;
        }
        

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
      pageNo: status === "HISTORY" ? this.historyPage : (status == "ACTIVE" ? this.latestPage : this.mylistPage) ,
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
            console.log("Admin", this.historyTabDetails);
          }
          this.historyCount = res.count;
          this.historyPage++;
        } else if (status == "ACTIVE") {
          if (event) {
            this.latestTabDetails = [...this.latestTabDetails, ...res.data];
          } else {
            this.latestTabDetails = res.data;
            console.log("this.latestTabDetails", this.latestTabDetails);
          }
          this.latestCount = res.count;
          this.latestPage++;
        } else {
          if (event) {
            this.myListTabDetails = [...this.myListTabDetails, ...res.data];
          } else {
            this.myListTabDetails = res.data;
            console.log("this.myListTabDetails", this.myListTabDetails);
          }
          this.myListCount = res.count;
          this.mylistPage++;
        }
       

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
  openModel(key: string, data: any) {
    console.log("11111", this.activeSegment);

    switch (key) {
      case "history":
        this.router.navigate(["/layout/history"], {
          state: {
            segment: this.activeSegment,
            data: data,
          },
        });
       

        break;
      case "latest":
        if (this.user.role == "ADMIN") {
          this.modalService.openModal(AdminRequestActiveComponent, { data });
        } else {
          this.modalService.openModal(BloodrequestMylistComponent, { data });
        }

        break;
      case "list":
        if (this.user.role == "ADMIN") {
          this.sessionStorage.set("request", data);
          this.router.navigate(["/layout/request-mylist-detail"]);
        }

        break;
      
      default:
        break;
    }
  }

  doInfinite(event) {
    console.log("doInfinite", this.activeSegment,);
    
    if (this.activeSegment == "latest") {
      if (this.latestCount == this.latestTabDetails.length) {
        event.target.complete();
        return;
      }
      if (this.user.role == "ADMIN") {
        this.getAllAdminList("ACTIVE", event);
      } else {
        this.getAllAttenderList("ACTIVE", event);
      }
    } else if (this.activeSegment == "history") {
      if (this.historyCount == this.historyTabDetails.length) {
        event.target.complete();
        return;
      }

      if (this.user.role == "ADMIN") {
        this.getAllAdminList("HISTORY", event);
      } else {
        this.getAllAttenderList("HISTORY", event);
      }
    } else {
      console.log("this.myListCount----",this.myListCount,this.latestPage,this.myListTabDetails.length);
      if (this.myListCount == this.myListTabDetails.length) {
        event.target.complete();
        return;
      }

      if (this.user.role == "ADMIN") {
        this.getAllAdminList("MYLIST", event);
      }
    }
   
    event.target.complete();
  }

  done(data : any,index : number){
    this.loader = true;
    console.log("index----",index);
    console.log("myListTabDetails----",this.myListTabDetails);
    console.log("historyTabDetails----",this.historyTabDetails);
    this.service.statusUpdate(data.id, 'DONE').subscribe(
      async (success) => {
        this.toast.successToast(success.message);

       let data =  this.myListTabDetails[index];
       this.myListTabDetails.splice(index,1);
       this.historyTabDetails.unshift(data);
        this.loader = false;
      },
      async (error: any) => {
        this.loader = false;
        this.toast.errorToast(error.message);
      }
    );
  
  }
}
