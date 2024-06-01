import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { StorageService } from "src/app/core/services/local-storage.service";
import { ToastService } from "src/app/core/services/toast.service";
import { AuthService } from "src/app/service/auth/auth.service";
import { CameraService } from "src/app/service/camera.service";
import { BloodDonationService } from "src/app/service/donation/donation.service";
import { LoaderService } from "src/app/service/loader.service";
import { CalenderComponent } from "src/app/shared/models/calender/calender.component";

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
  donorImage: string = null;
  userData: any;
  constructor(
    private router: Router,
    private modalController: ModalController,
    private localStorage: StorageService,
    private service: BloodDonationService,
    private toast: ToastService,
    private spinner: LoaderService,
    private cameraService: CameraService,
    private authService: AuthService,

  ) { }


  ngOnInit() {
    // this.f['donationDate'].setValue( this.data.donationDate);

  }

  ionViewWillEnter() {

    this.user = this.localStorage.get("user");
    this.edit = this.data.bloodBankName == null ? true : false;
    this.donorImage = this.data?.image ? this.data?.image : null;
    if (this.user.role == 'ADMIN') {
      this.openAccordion = !!this.data.bloodRequest ? 'second' : 'first';
    } else {
      this.openAccordion = !!this.data.bloodRequest ? 'second' : (!!this.data.location ? 'first' : 'third');
    }

    if (this.edit) {
      this.bloodDonateForm.controls.donationDate.setValue(new Date(this.data.donationDate.split('-').reverse().join('-')).toISOString());
    }

    this.userData = this.localStorage.get("user");
    // if (this.userData.id) {
    //   this.getByIdData(this.userData.id);
    // }

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
    console.log("date", date);

    date = date ? date : new Date().toISOString()
    const modal: any = await this.modalController.create({
      component: CalenderComponent,
      cssClass: "calender-model",
      componentProps: {
        date: date
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
        // this.toast.errorToast(error.error);
        this.toast.errorToast(error.message);
      }
    );
  }

  async editData() {
    this.edit = !this.edit;
    this.bloodDonateForm.patchValue(this.data);
    this.bloodDonateForm.controls.donationDate.setValue(new Date(this.data.donationDate.split('-').reverse().join('-')).toISOString());


  }
  // status update by attender
  async statusUpdate(status: any) {

    if (status == 'CANCEL' && !!this.data.bloodRequest) {

      this.data.donationDate = this.data.donationDate.split('-').reverse().join()

      let isValid = this.checkDonationGap(this.data.donationDate)
      console.log("isValid----",isValid);
      
      if (isValid) {
        this.toast.errorToast("Contact admin for cancelling request");

        return
      }


    }

    this.loader = true;
    // await this.spinner.showLoader();
    this.data.status = status;
    this.service.statusUpdate(this.data.id, this.data.status).subscribe(
      async (success) => {
        this.toast.successToast(success.message);
        // await this.spinner.hideLoader();
        this.loader = false;
        if (status == 'CANCEL'){
          this.modalController.dismiss("CANCEL");
        }
      },
      async (error: any) => {
        this.loader = false;
        // await this.spinner.hideLoader();
        // this.toast.errorToast(error.error);
        this.toast.errorToast(error.message);
      }
    );
  }

  // handleRefresh(event:any){

  // }

  //profile
  async uploadFile() {
    this.cameraService.requestPermission();
    let image = await this.cameraService.openCamera();
    // const compressedImage = await this.compressImage(image.base64String, image.format);
    let imageBlob = await this.cameraService.b64toBlob(
      image.base64String,
      // compressedImage,
      `image/${image.format}`
    );
    const formData = new FormData();
    formData.append("id", this.data.id);
    formData.append(
      "image",
      imageBlob,
      `${this.data.firstName}_${this.data.id}`
    );
    this.service.uploadImage(formData).subscribe(
      (success: any) => {
        this.donorImage = success.image;
      },
      (error) => {
        this.toast.errorToast(error.message);
      }
    );
  }
  // getByIdData(id: any) {
  //   this.authService.profile(id).subscribe(
  //     (success: any) => {
  //       this.user = success;
  //       this.profile = success.image;
  //     },
  //     (error) => {
  //       this.toast.errorToast(error.message);
  //     }
  //   );
  // }

  checkDonationGap(donationDate) {
    // Get the current date and time
    let currentdate = new Date();

    let currentdateIST: any = new Date(currentdate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));


    let timeDifference = Math.abs(donationDate - currentdateIST);

    let hoursDifference = timeDifference / (1000 * 60 * 60);

    console.log("hoursDifference----",hoursDifference);
    
    return hoursDifference <= 10;
  }

}
