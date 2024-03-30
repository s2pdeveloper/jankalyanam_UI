import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { StorageService } from "src/app/core/services/local-storage.service";

@Component({
  selector: "app-donation-details",
  templateUrl: "./donation-details.component.html",
  styleUrls: ["./donation-details.component.scss"],
})
export class DonationDetailsComponent implements OnInit {
  @Input() data :any;
  user:any={};
  constructor(
    private router: Router,
    private modalController: ModalController,
    private localStorage: StorageService,
  ) {}

  ngOnInit() {
    this.user = this.localStorage.get("user");
    console.log("data----",this.data);
    
  }
  
  dismiss() {
    this.modalController.dismiss();
  }
}
