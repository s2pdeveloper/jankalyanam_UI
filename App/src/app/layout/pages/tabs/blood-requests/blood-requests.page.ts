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
@Component({
  selector: "app-blood-requests",
  templateUrl: "./blood-requests.page.html",
  styleUrls: ["./blood-requests.page.scss"],
})
export class BloodRequestsPage implements OnInit {
  user: any = {};
  page: number = 0;
  pageSize: number = 10;
  search: any = "";
  type: any = "";
  sortBy: any = "";
  activeSegment = null;
  currentTitle = "history";
  historyTabDetails: any = [];
  latestTabDetails: any = [];
  myListTabDetails: any = [];
  count: number = 0;
  loader = true;

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
        this.getAllAdminList("MYLIST");
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
            console.log("-------", this.historyTabDetails);
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
            console.log("Admin", this.historyTabDetails);
          }
        } else if (status == "ACTIVE") {
          if (event) {
            this.latestTabDetails = [...this.latestTabDetails, ...res.data];
          } else {
            this.latestTabDetails = res.data;
            console.log("this.latestTabDetails", this.latestTabDetails);
          }
        } else {
          if (event) {
            this.myListTabDetails = [...this.myListTabDetails, ...res.data];
          } else {
            this.myListTabDetails = res.data;
            console.log("this.myListTabDetails", this.myListTabDetails);
          }
        }
        this.count = res.count;

        if (res?.data.length === 0 && event) {
          event.target.disabled = true;
        }

        // await this.spinner.hideLoader();
        this.loader = false;
      },
      async (error) => {
        // await this.spinner.hideLoader();
        this.loader = false;
        this.toast.errorToast("Something went wrong!");
      }
    );
  }
  openModel(key: string, data: any) {
    switch (key) {
      case "history":
        if (this.user.role == "ADMIN") {
          this.router.navigate(["/layout/history"])
        } else {
          this.modalService.openModal(DonationHistoryComponent, { data });
        }
        // this.router.navigate(["/layout/history"])
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
      // case "list":
      //   this.modalService.openModal(AdminRequestMylistComponent, {data});
      //   break;
      // case "details":
      //   this.modalService.openModal(AdminRequestActiveComponent, { data });
      //   break;

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
    } else if (this.activeSegment == "history") {
      if (this.count == this.historyTabDetails.length) {
        event.target.complete();
        return;
      }

      if (this.user.role == "ADMIN") {
        this.getAllAdminList("HISTORY", event);
      } else {
        this.getAllAttenderList("HISTORY", event);
      }
    } else {
      if (this.count == this.myListTabDetails.length) {
        event.target.complete();
        return;
      }

      if (this.user.role == "ADMIN") {
        this.getAllAdminList("MYLIST", event);
      }
    }
    this.page++;
    event.target.complete();
  }
}
