import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { ToastService } from "src/app/core/services";
import { BloodRequestService } from "src/app/service/request/request.service";
import { RestService } from "src/app/core/services/rest.service";
import { IonicSelectableComponent } from "ionic-selectable";
import { CalenderComponent } from "src/app/shared/models/calender/calender.component";
import { LoaderService } from "src/app/service/loader.service";
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: "app-request",
  templateUrl: "./request.page.html",
  styleUrls: ["./request.page.scss"],
})
export class RequestPage implements OnInit {

  states: any = [];
  district: any = [];
  tehsil: any = [];
  village: any = [];
  selectTable = {
    state: null,
    district: null,
    tahsil: null,
    village: null,
  };
  isFemale: boolean = false;
  isCity: boolean = false;
  bloodGroup: any = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  bloodType:any = ["REGULAR"];
  units: any = [1,2,3,4,5,6,7,8,9,10];
  hemoglobin:any=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
  constructor(
    private service: BloodRequestService,
    private router: Router,
    private toast: ToastService,
    private spinner: LoaderService,
    private modalController: ModalController,
    private authService: AuthService,

  ) {}

  ngOnInit() {
    // this.states = this.restService.getStatesOfCountry("IN");
  }

  ionViewWillEnter() {
    console.log("inside request form---");
    
    this.authService.getAllState().subscribe((success: any) => {
      this.states = success;
      console.log('this.listData-----', this.states);
    });
  }

  bloodRequestForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    age: new FormControl("", [Validators.required]),
    bloodRequireDate: new FormControl("", [Validators.required]),
    mobileNo: new FormControl("", [Validators.required,Validators.maxLength(12),Validators.minLength(10)]),
    // location: new FormControl("", [Validators.required]),
    hospitalName: new FormControl("", [Validators.required]),
    hemoglobin: new FormControl("", [Validators.required]),
    illness: new FormControl("", [Validators.required]),
    units: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
    district:  new FormControl("", [Validators.required]),
    tahsil :  new FormControl(""),
    village :  new FormControl(""),
    gender: new FormControl("", [Validators.required]),
    fatherOrHusband: new FormControl(""),
    bloodGroup: new FormControl("", [Validators.required]),
    bloodType: new FormControl("", [Validators.required]),

  });

  get f() {
    return this.bloodRequestForm.controls;
  }

  getDistrictByStateId() {
    this.selectTable.tahsil = null;
    this.selectTable.village = null;
    this.selectTable.district = null;
    this.tehsil = [];
    this.village = [];

    this.authService
      .getDistrictByStateId(this.selectTable.state.id)
      .subscribe((success: any) => {
        this.district = success;
      });
  }

  getTahsilByDistrictId() {
    this.selectTable.tahsil = null;
    this.selectTable.village = null;
    this.tehsil = [];
    this.village = [];
    this.authService
      .getTahsilByDistrictId(this.selectTable.district.id)
      .subscribe((success: any) => {
        this.tehsil = success;
      });
  }

  getVillageByTahsilId() {
    this.selectTable.village = null;
    this.authService
      .getVillageByTahsilId(this.selectTable.tahsil.id)
      .subscribe((success: any) => {
        this.village = success;
      });
  }

  async create() {

    if (!!this.selectTable.state) {
      this.f['state'].setValue(this.selectTable.state.stateName);
    }
    if (!!this.selectTable.district) {
      this.f['district'].setValue(this.selectTable.district.districtName);
    }
    if (!!this.selectTable.tahsil) {
      this.f['tahsil'].setValue(this.selectTable.tahsil.tahsilName);
    }
    if (!!this.selectTable.village) {
      this.f['village'].setValue(this.selectTable.village.villageName);
    }
    if (this.bloodRequestForm.invalid) {
      console.log(this.bloodRequestForm.controls);

      this.toast.successToast("Please fill required fields!");
      return;
    }
    await this.spinner.show();
    this.service.create(this.bloodRequestForm.value).subscribe(
      async (success: any) => {
        this.toast.successToast(success.message);
        // this.bloodRequestForm.reset();
        await this.spinner.hide();
        this.router.navigate(["/layout/home"]);
      },
      async (error: any) => {
        await this.spinner.hide();
        // this.toast.errorToast(error.error);
        this.toast.errorToast(error.message);
      }
    );
  }

  

  async openCalender(field: any) {
    let date = this.f[field].value
      ? new Date(this.f[field].value).toISOString()
      : new Date().toISOString;
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

 


  checkGender() {
    console.log("this.f[].value", this.f["gender"].value);

    if (this.f["gender"].value == "FEMALE") {
      this.isFemale = true;
    } else {
      this.isFemale = false;
    }
  }
  ionViewWillLeave(){
    this.bloodRequestForm.reset();
  }
  
}
