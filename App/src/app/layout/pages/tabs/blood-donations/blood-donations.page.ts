import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/service/modal.service';
import { DonationDetailsComponent } from 'src/app/shared/models/donation-details/donation-details.component';
import { DonationHistoryComponent } from 'src/app/shared/models/donation-history/donation-history.component';

@Component({
  selector: 'app-blood-donations',
  templateUrl: './blood-donations.page.html',
  styleUrls: ['./blood-donations.page.scss'],
})
export class BloodDonationsPage implements OnInit {

  constructor(private router : Router,private modalService:ModalService) { }

  ngOnInit() {}
  navigateTo(url: string) {
    console.log(url);
    this.router.navigate([url]);
  }
  activeSegment = 'latest';
  currentTitle = 'history';
  openModel(){
    this.modalService.openModal(DonationDetailsComponent,{})
  };
  openNewModel(){
    this.modalService.openModal(DonationHistoryComponent,{})
  }
}
