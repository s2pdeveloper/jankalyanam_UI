import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { ToastService } from 'src/app/core/services';
import { BloodDonationService } from 'src/app/service/donation/donation.service';

@Component({
  selector: 'app-donation-history',
  templateUrl: './donation-history.component.html',
  styleUrls: ['./donation-history.component.scss'],
})
export class DonationHistoryComponent  implements OnInit {
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
  @Input() data :any;
  constructor(
    private modalController: ModalController,
    private service: BloodDonationService,
    private toast: ToastService
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    // this.user = this.localStorage.get("user");
    if (this.user.role == "ATTENDER") {
      // this.getAllAttenderList("ACTIVE");
      // this.getAllAttenderList("HISTORY");
    } else if (this.user.role == "ADMIN") {
      this.getAllAdminList("ACTIVE");
      this.getAllAdminList("HISTORY");
    }
  }
  dismiss() {
    this.modalController.dismiss();
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
}
