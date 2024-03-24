import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-donation-details",
  templateUrl: "./donation-details.component.html",
  styleUrls: ["./donation-details.component.scss"],
})
export class DonationDetailsComponent implements OnInit {
  @Input() data :any;
  constructor(
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {}
  
  dismiss() {
    this.modalController.dismiss();
  }
}
