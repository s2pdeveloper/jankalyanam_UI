import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { StorageService } from "src/app/core/services/local-storage.service";
import { ToastService } from "src/app/core/services/toast.service";
import { BloodRequestService } from "src/app/service/request/request.service";
import { RestService } from "src/app/core/services/rest.service";
import { BloodDonationService } from "src/app/service/donation/donation.service";
import { Location } from "@angular/common";
import { SessionStorageService } from "src/app/core/services/session-storage.service";
@Component({
  selector: "app-request-mylist-detail",
  templateUrl: "./request-mylist-detail.page.html",
  styleUrls: ["./request-mylist-detail.page.scss"],
})
export class RequestMylistDetailPage implements OnInit {
  // @Input() data: any;
  data: any = null;
  // formData : any = null;
  providedBy: any = "";
  edit: boolean = false;
  donorEdit: boolean = false;
  user: any = {};
  states: any = [];
  cities: any = [];
  donorData: any = [];
  loader = true;
  isDisabled = false;
  count: number = 0;
  page: number = 0;
  pageSize: number = 10;
  sortBy: any = "";
  donor: any = null;
  selectTable = {
    state: { name: null },
    city: { name: null },
    donor: { id: null, name: null },
  };
  constructor(
    private router: Router,
    private localStorage: StorageService,
    private sessionStorage: SessionStorageService,
    private modalController: ModalController,
    private service: BloodRequestService,
    private donorService: BloodDonationService,
    private toast: ToastService,
    private restService: RestService,
    private location: Location
  ) {}

  bloodRequestAllocateForm = new FormGroup({
    bankCity: new FormControl("", [Validators.required]),
    bankState: new FormControl("", [Validators.required]),
    bloodBankName: new FormControl("", [Validators.required]),
    provided: new FormControl(""),
    donorId: new FormControl(""),
  });

  ngOnInit() {}

  ionViewWillEnter() {
    console.log(this.providedBy);
    
    let state: any = this.location?.getState();
    console.log("state------", state);

    this.user = this.localStorage.get("user");
    this.data = this.sessionStorage.get("request");
    console.log("data----", this.data);
    this.providedBy = this.data.provided ? this.data.provided : null;
    this.edit = this.data.bloodBankName == null ? true : false;
    this.donorEdit = this.data.donor == null ? true : false;
    this.donor = this.data.donor ? this.data.donor : null;
    console.log("this.edit ----", this.edit);
    console.log("this.donor----", this.donor);
    this.states = this.restService.getStatesOfCountry("IN");

    this.isDisabled =
      this.data.status == "DONE" || this.data.status == "RECEIVED";
    this.donorList();
    if (state.success) {
      this.donor = state?.success || null;
      this.donorData.push(this.donor);
      this.f["donorId"].setValue(this.donor.id);
      console.log("donorData", this.donorData);
      this.providedBy = "DONOR";
      this.data.provided = "DONOR";
      this.selectTable.donor.id = state.success.id;
      this.selectTable.donor.name = state.success.name;
    }
  }
  get f() {
    return this.bloodRequestAllocateForm.controls;
  }

  async donorList() {
    this.loader = true;
    let params = {
      pageNo: this.page,
      pageSize: this.pageSize,
      sortBy: this.sortBy,
      // group:'A%2B' || 'A%20-'
      group: this.data.bloodGroup
        .trim()
        .replace(/\+/g, "%2B")
        .replace(/-/g, "%20-"),
    };
    this.donorService.getDonorList(params).subscribe({
      next: (res) => {
        this.donorData = res.data;
        console.log(
          "this.donorData-----",
          this.donorData,
          this.donorData.length
        );
        this.loader = false;
      },
      error: (err) => {
        console.error(err);
        this.loader = false;
      },
    });
  }

  async selectDonor(donor: any) {
    console.log("donor----", donor.value);
    this.donor = donor.value;
    this.f["donorId"].setValue(donor.value.id);
  }
  async editData() {
    this.edit = !this.edit;
    this.bloodRequestAllocateForm.patchValue(this.data);
    this.selectTable.state.name = this.data.bankState;
    this.selectTable.city.name = this.data.bankCity;
  }
  async donorEditData() {
    this.donorEdit = !this.donorEdit;
  }
  navigate() {
    console.log("in naviatge");
    this.router.navigate([
      "/layout/donate",
      {
        value: true,
      },
    ]);
  }
  async allocate() {
    // this.bloodDonateForm.value.status = 'ALLOCATED';

    this.f["provided"].setValue(this.providedBy);

    if (this.providedBy != "DONOR" && this.bloodRequestAllocateForm.invalid) {
      this.toast.successToast("Please fill required fields!");
      return;
    }
    this.edit = !this.edit;
    this.donorEdit = !this.donorEdit;
    this.loader = true;

    this.service
      .allocate(this.data.id, this.bloodRequestAllocateForm.value)
      .subscribe({
        next: (success) => {
          this.toast.successToast(success.message);
          if (this.providedBy != "DONOR") {
            this.data.bloodBankName = this.bloodRequestAllocateForm.value.bloodBankName;
            this.data.bankState = this.bloodRequestAllocateForm.value.bankState;
            this.data.bankCity = this.bloodRequestAllocateForm.value.bankCity;
          }

          this.bloodRequestAllocateForm.reset();

          this.loader = false;
        },
        error: (err) => {
          this.loader = false;
          this.toast.errorToast(err.error);
        },
      });
  }

  getCity(bankState: any) {
    console.log("bankState", bankState);

    this.f["bankState"].setValue(bankState.value.name);
    if (bankState) {
      this.cities = this.restService.getCitiesOfState(
        bankState.value.countryCode,
        bankState.value.isoCode
      );
    }
  }
  setCity(bankCity: any) {
    this.f["bankCity"].setValue(bankCity.value.name);
  }
  // ionViewWillLeave(){
  //   this.sessionStorage.remove('request');
  // }

  back() {
    this.sessionStorage.remove("request");
    this.router.navigate(["/layout/blood-requests"]);
   
  }
}
