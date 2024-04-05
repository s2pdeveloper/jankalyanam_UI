import { Component, OnInit,Input } from '@angular/core';
// import { StorageService } from 'src/app/core/services/local-storage.service';
import { StorageService } from 'src/app/core/services';
import { BloodDonationService } from 'src/app/service/donation/donation.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
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
  
    private service: BloodDonationService,
    
    private localStorage: StorageService,
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.user = this.localStorage.get("user");
   
  }
  // dismiss() {
  //   this.modalController.dismiss();
  // }

}
