import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-donation-details",
  templateUrl: "./donation-details.component.html",
  styleUrls: ["./donation-details.component.scss"],
})
export class DonationDetailsComponent implements OnInit {
  constructor(
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {}
  // navigateTo(url: string) {
  //   console.log(url);
  //   this.router.navigate([url]);
  // }
  dismiss() {
    this.modalController.dismiss();
  }
}
