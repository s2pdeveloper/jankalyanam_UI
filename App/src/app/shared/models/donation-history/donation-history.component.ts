import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { StorageService, ToastService } from 'src/app/core/services';
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
    private toast: ToastService,
    private localStorage: StorageService,
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.user = this.localStorage.get("user");
   
  }
  dismiss() {
    this.modalController.dismiss();
  }

}
