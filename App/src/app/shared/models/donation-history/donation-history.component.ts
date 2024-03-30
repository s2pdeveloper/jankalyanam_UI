import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-donation-history',
  templateUrl: './donation-history.component.html',
  styleUrls: ['./donation-history.component.scss'],
})
export class DonationHistoryComponent  implements OnInit {
  
  @Input() data :any;
  constructor(
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

}
