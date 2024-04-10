import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { LoaderService } from "src/app/core/services/loader.service";
import { StorageService } from "src/app/core/services/local-storage.service";
import { ToastService } from "src/app/core/services/toast.service";
import { CalenderComponent } from "src/app/layout/components/calender/calender.component";
import { BloodDonationService } from "src/app/service/donation/donation.service";

@Component({
  selector: "app-donation-details",
  templateUrl: "./donation-details.component.html",
  styleUrls: ["./donation-details.component.scss"],
})
export class DonationDetailsComponent implements OnInit {
  @Input() data: any;
  user: any = {};
  edit: boolean = false;
  openAccordion = '';
  loader = true;
  constructor(
    private router: Router,
    private modalController: ModalController,
    private localStorage: StorageService,
    private service: BloodDonationService,
    private toast: ToastService,
    private spinner: LoaderService
  ) {}


  ngOnInit() {
    // this.f['donationDate'].setValue( this.data.donationDate);

  }
  
  ionViewWillEnter() {
   
    this.user = this.localStorage.get("user");
    this.edit = this.data.bloodBankName == null ? true : false;
    if(this.user.role == 'ADMIN'){
      this.openAccordion = !!this.data.bloodRequest ? 'second' : 'first';
    }else{
      this.openAccordion = !!this.data.bloodRequest ? 'second' : (!!this.data.location ?'first' : 'third');
    }
  
    console.log("this.edit ----", this.edit,this.openAccordion,this.data);
    this.bloodDonateForm.controls.donationDate.setValue(new Date(this.data.donationDate.split('-').reverse().join('-')).toISOString());
    
  }
  bloodDonateForm = new FormGroup({
    location: new FormControl("", [Validators.required]),
    status: new FormControl("", [Validators.required]),
    bloodBankName: new FormControl("", [Validators.required]),
    donationDate: new FormControl("", [Validators.required]),
  });
  get f() {
    return this.bloodDonateForm.controls;
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async openCalender(date: any) {
    console.log("date",date);
    
    date = date ? date : new Date().toISOString()
    const modal: any = await this.modalController.create({
      component: CalenderComponent,
      cssClass: "calender-model",
      componentProps: {
      date:date
      },
    });

    await modal.present();
    await modal.onWillDismiss().then((data: any) => {
      console.log("data---", data);

      if (data.data && data.data.date) {
        this.f["donationDate"].setValue(data.data.date);
      }
    });
  }

  async allocate() {
    // this.bloodDonateForm.value.status = 'ALLOCATED';
    
    this.f["status"].setValue("ALLOCATED");
    if (this.bloodDonateForm.invalid) {
      console.log(this.bloodDonateForm.controls);

      this.toast.errorToast("Please fill required fields!");
      return;
    }
    this.edit = !this.edit;
    // await this.spinner.showLoader();
    this.loader = true;

    this.service.allocate(this.data.id, this.bloodDonateForm.value).subscribe(
      async (success) => {
        this.toast.successToast(success.message);
        this.data.location = this.bloodDonateForm.value.location;
        this.data.bloodBankName = this.bloodDonateForm.value.bloodBankName;
        this.data.donationDate = this.bloodDonateForm.value.donationDate;
        this.data.status = "ALLOCATED";
        this.bloodDonateForm.reset();

        this.loader = false;
      },
      async (error: any) => {
        this.loader = false;
        this.toast.errorToast(error.error);
      }
    );
  }

  async editData(){
    this.edit = !this.edit;
this.bloodDonateForm.patchValue(this.data);
    

  }
  // status update by attender
  async statusUpdate(status: any) {
    this.loader = true;
    // await this.spinner.showLoader();
    this.data.status = status;
    this.service.statusUpdate(this.data.id, this.data.status).subscribe(
      async (success) => {
        this.toast.successToast(success.message);
        // await this.spinner.hideLoader();
        this.loader = false;
      },
      async (error: any) => {
        this.loader = false;
        // await this.spinner.hideLoader();
        this.toast.errorToast(error.error);
      }
    );
  }

  // handleRefresh(event:any){

  // }
}
