import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/service/modal.service';
import { DonationDetailsComponent } from 'src/app/shared/models/donation-details/donation-details.component';
import { BloodRequestService } from 'src/app/service/request/request.service';
import { forkJoin } from 'rxjs';
import { StorageService } from 'src/app/core/services';
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

  constructor(
    private router: Router,
    private modalService: ModalService,
    private service: BloodRequestService,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.user = this.storage.get('user');
    this.user.role == 'ATTENDER' ? this.getAllAttenderList() : '';
  }
  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  openModel() {
    this.modalService.openModal(DonationDetailsComponent, {});
  }

  getAllAttenderList() {
    // this.service.getAllAttenderList('HISTORY').subscribe((success: any) => {
    //   this.historyTabDetails = success;
    // });
    // this.service.getAllAttenderList('ACTIVE').subscribe((success: any) => {
    //   this.latestTabDetails = success;
    // });

    forkJoin([
      this.service.getAllAttenderList('HISTORY'),
      this.service.getAllAttenderList('ACTIVE'),
    ]).subscribe((res) => {
      this.historyTabDetails = res[0];
      this.latestTabDetails = res[1];
    });
  }
}
