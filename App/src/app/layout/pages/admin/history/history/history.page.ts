import { Component, OnInit,Input } from '@angular/core';
// import { StorageService } from 'src/app/core/services/local-storage.service';
import { StorageService } from 'src/app/core/services';
import { BloodDonationService } from 'src/app/service/donation/donation.service';
import { Location } from "@angular/common";
import { Route, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
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
  data:any = {};
  segment : string;
  backRoute : any;
  constructor(
  
    private service: BloodDonationService,
    private location: Location,
    private localStorage: StorageService,
    private router: Router,
    private navCtlr:NavController
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    let state: any = this.location?.getState();
    if(state?.data){
    this.data = state.data;
    }
    if(state?.segment){
    this.segment = state.segment;

    }
    this.user = this.localStorage.get("user");
  }

  goBack(){
  //  this.location.back()
    this.router.navigate(['/layout/blood-requests'],
    {queryParams:{...( this.segment && {
      segment:this.segment
    })}})
  }

  
}
