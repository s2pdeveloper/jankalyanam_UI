import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-admin-request-active',
  templateUrl: './admin-request-active.component.html',
  styleUrls: ['./admin-request-active.component.scss'],
})
export class AdminRequestActiveComponent  implements OnInit {

  constructor(
    private modalController: ModalController
  ) {}

  ngOnInit() {}
  dismiss() {
    this.modalController.dismiss();
  }
}
