import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { StorageService } from "src/app/core/services/local-storage.service";
import { CalenderComponent } from "src/app/layout/components/calender/calender.component";

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
  bloodDonateForm = new FormGroup({
    location: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    bloodBankName: new FormControl('', [Validators.required]),
    donationDate: new FormControl('', [Validators.required]),
  });
   get f(){
    return this.bloodDonateForm.controls;
   }
  
    dismiss() {
    this.modalController.dismiss();
  }

  async openCalender(date: any) {
    const modal: any = await this.modalController.create({
      component: CalenderComponent,
      cssClass: 'calender-model',
      componentProps: {
        date,
      },
    });

    await modal.present();
    await modal.onWillDismiss().then((data: any) => {
      console.log('data---', data);

      if (data.data && data.data.date) {
        this.f['donationDate'].setValue(data.data.date);
      }
    });
  }
}
