import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { ToastService } from "src/app/core/services";
import { LoaderService } from "src/app/core/services/loader.service";
import { BloodDonationService } from "src/app/service/donation/donation.service";
import { IonicSelectableComponent } from "ionic-selectable";
import { RestService } from "src/app/core/services/rest.service";
import { AdminRequestActiveComponent } from "src/app/shared/models/admin-request-active/admin-request-active.component";
import { ModalService } from "src/app/service/modal.service";
import { CalenderComponent } from "src/app/shared/models/calender/calender.component";

@Component({
  selector: "app-donate",
  templateUrl: "./donate.page.html",
  styleUrls: ["./donate.page.scss"],
})
export class DonatePage implements OnInit {
  @ViewChild("selectableState") selectableState: any = IonicSelectableComponent;
  @ViewChild("selectableCity") selectableCity: any = IonicSelectableComponent;
  states: any = [];
  cities: any = [];
  bloodGroup: any = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  bloodRequest: Boolean = false;
  donationDateSelected: Boolean = false;
  disabledCity: Boolean = true;
  isCity: boolean = false;
  translatedName: string = "";
  constructor(
    private service: BloodDonationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: ToastService,
    private spinner: LoaderService,
    private modalController: ModalController,
    private restService: RestService,
    private modalService: ModalService,
   
  ) {
    
  }


  ngOnInit() {
}
  ionViewWillEnter() {
    this.bloodRequest =
      this.activatedRoute.snapshot.paramMap.get("value") == "true";
    this.states = this.restService.getStatesOfCountry("IN");
    console.log("this.states-----", this.states);
    
  }
 
 
  bloodDonateForm = new FormGroup({
    age: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    donationDate: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    hemoglobin: new FormControl("", [Validators.required]),
    illness: new FormControl(false, []),
    mobileNo: new FormControl("", [Validators.required]),
    name: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    bloodGroup: new FormControl("", [Validators.required]),
  });

  get f() {
    return this.bloodDonateForm.controls;
  }
 

  async create() {
    if (this.bloodDonateForm.invalid) {
      console.log(this.bloodDonateForm.controls);

      this.toast.errorToast("Please fill required fields!");
      return;
    }

    await this.spinner.showLoader();
    this.service.create(this.bloodDonateForm.value).subscribe(
      async (success: any) => {
        this.toast.successToast("Donar Created Successfully!");
        this.bloodDonateForm.reset();
        await this.spinner.hideLoader();
        if (this.bloodRequest) {
          this.router.navigate(["/layout/request-mylist-detail"], {
            state: { success },
          });
        } else {
          this.router.navigate(["/layout/home"]);
        }
      },
      async (error: any) => {
        await this.spinner.hideLoader();
        this.toast.errorToast(error.message);
      }
    );
  }

  async openCalender(field: any) {
    let date = this.f[field].value
      ? new Date(this.f[field].value).toISOString()
      : new Date().toISOString();
    const modal: any = await this.modalController.create({
      component: CalenderComponent,
      cssClass: "calender-model",
      componentProps: {
        date,
      },
    });

    await modal.present();
    await modal.onWillDismiss().then((data: any) => {
      console.log("data---", data);

      if (data.data && data.data.date) {
        this.f[field].setValue(data.data.date);
      }
    });
  }

  getCity(state: any) {
    if (state && state.value && state.value.name) {
      this.f["state"].setValue(state.value.name);
      this.isCity = true;
      this.disabledCity = false;
      this.cities = this.restService.getCitiesOfState(
        state.value.countryCode,
        state.value.isoCode
      );
    } else {
      this.disabledCity = true;
      this.cities = [];
      console.log("it is disabled");
    }
  }
  setCity(city: any) {
    this.f["city"].setValue(city.value.name);
  }
  navigate() {
    if (this.bloodRequest) {
      this.router.navigate(["/layout/request-mylist-detail"], {});
    } else {
      this.router.navigate(["/layout/home"]);
    }
  }
}
