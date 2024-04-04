import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from "@ionic/angular";
import { StorageService } from 'src/app/core/services/local-storage.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { BloodRequestService } from 'src/app/service/request/request.service';
import { RestService } from 'src/app/core/services/rest.service';
import { BloodDonationService } from 'src/app/service/donation/donation.service';

@Component({
  selector: 'app-admin-request-mylist',
  templateUrl: './admin-request-mylist.component.html',
  styleUrls: ['./admin-request-mylist.component.scss'],
})
export class AdminRequestMylistComponent  implements OnInit {
  @Input() data: any;
  providedBy:any = '';
  edit: boolean = false;
  user: any = {};
  states: any = [];
  cities: any = [];
  donorData: any = [];
  loader = true;
  isDisabled = false;
  count: number = 0;
  page:number = 0;
  pageSize:number =10;
  sortBy:any='';
  donor:any =null;
  constructor(
    private router: Router,
    private localStorage: StorageService,
    private modalController: ModalController,
    private service: BloodRequestService,
    private donorService: BloodDonationService,
    private toast: ToastService,
    private restService: RestService
  ) {}

  bloodRequestAllocateForm = new FormGroup({
    bankCity: new FormControl("", [Validators.required]),
    bankState: new FormControl("", [Validators.required]),
    bloodBankName: new FormControl("", [Validators.required]),
    provided: new FormControl("", ),
    donorId: new FormControl("", ),
  });
  
  ngOnInit() {
    this.user = this.localStorage.get("user");
    console.log("data----", this.data, this.data.bloodBankName);
    this.edit = this.data.bloodBankName == null ? true : false;
    console.log("this.edit ----", this.edit);
    this.states = this.restService.getStatesOfCountry('IN');
    this.providedBy = this.data.provided ? this.data.provided  : null;
    this.isDisabled = this.data.status == 'DONE' || this.data.status == 'RECEIVED';
    this.donorList();

  }
  get f() {
    return this.bloodRequestAllocateForm.controls;
  }

  async donorList(){
    this.loader = true;
    let params = {
      pageNo: this.page,
      pageSize: this.pageSize,
      sortBy: this.sortBy,
      // group:'A%2B' || 'A%20-'
      group:'A%2B'
    };
this.donorService.getDonorList(params).subscribe({
  next: (res) => {
    this.donorData = res.data;
    this.loader = false;
  }, error: (err) => {
      console.error(err);
  this.loader = false;

  }
});

  }

  async selectDonor(donor:any){
    console.log("donor----",donor.value);
    this.donor = donor.value;
    this.f["donorId"].setValue(donor.value.id);
  }
  async editData(){
    this.edit = !this.edit;
    this.bloodRequestAllocateForm.patchValue(this.data);
 }
  navigate(){
    console.log('in naviatge');
    this.modalController.dismiss()
    
    this.router.navigate(['/layout/donate',{
    
      value:true}])
  }
  async allocate() {
    // this.bloodDonateForm.value.status = 'ALLOCATED';
    this.f["provided"].setValue(this.providedBy);
    if (this.bloodRequestAllocateForm.invalid) {

      this.toast.successToast("Please fill required fields!");
      return;
    }
    this.edit = !this.edit;
    // await this.spinner.showLoader();
    this.loader = true;

    this.service.allocate(this.data.id, this.bloodRequestAllocateForm.value).subscribe({next:  (success) => {
      this.toast.successToast(success.message);
      this.data.bloodBankName = this.bloodRequestAllocateForm.value.bloodBankName;
      this.data.bankState = this.bloodRequestAllocateForm.value.bankState;
      this.data.bankCity = this.bloodRequestAllocateForm.value.bankCity;
    
      this.bloodRequestAllocateForm.reset();

      this.loader = false;
      console.log("state---BLOODBANKFORM",this.data.bankState);
      console.log("city---BLOODBANKFORM",this.data.bankCity);
      
    },error:(err)=>{
      this.loader = false;
      this.toast.errorToast(err.error);
    }})

  }
  dismiss() {
    this.modalController.dismiss();
  }

  getCity(bankState: any) {
    this.f['bankState'].setValue(bankState.value.name);
    this.cities = this.restService.getCitiesOfState(
      bankState.value.countryCode,
      bankState.value.isoCode
    );
  }
  setCity(bankCity: any) {
    this.f['bankCity'].setValue(bankCity.value.name);
  }
}
