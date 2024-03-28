import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/service/modal.service';
import { DonationDetailsComponent } from 'src/app/shared/models/donation-details/donation-details.component';
import { BloodRequestService } from 'src/app/service/request/request.service';
import { forkJoin } from 'rxjs';
import { StorageService } from 'src/app/core/services';
import { DonationHistoryComponent } from 'src/app/shared/models/donation-history/donation-history.component';
import { LoaderService } from 'src/app/core/services/loader.service';
@Component({
  selector: 'app-blood-donations',
  templateUrl: './blood-donations.page.html',
  styleUrls: ['./blood-donations.page.scss'],
})

export class BloodDonationsPage implements OnInit {

  activeSegment = 'latest';
  currentTitle = 'history';
  historyTabDetails: any = [];
  latestTabDetails: any = [];
  user: any = {};

  constructor( private router: Router,
    private modalService: ModalService,
    private service: BloodRequestService,
    private storage: StorageService,
    private spinner: LoaderService) {}

  ngOnInit() {
    this.user = this.storage.get('user');
  if (this.user.role == 'ATTENDER') {
    this.getAllAttenderList();
  }
    
  }
  navigateTo(url: string) {
    console.log(url);
    this.router.navigate([url]);
  }
  
  async getAllAttenderList() {
    await this.spinner.showLoader();
    forkJoin([
      this.service.getAllAttenderList('HISTORY'),
      this.service.getAllAttenderList('ACTIVE'),
    ]).subscribe(async (res) => {
      this.historyTabDetails = res[0];
      this.latestTabDetails = res[1];
      await this.spinner.hideLoader();
    });
  }
  
  openModel(key: string) {
    let data={}
    switch (key) {
      case "history":
        this.modalService.openModal(DonationHistoryComponent, {data});
        break;
      case "latest":
        this.modalService.openModal(DonationDetailsComponent, { data });
        break;
      default:
        break;
    }
  }
}
