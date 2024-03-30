import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/core/services';
import { LoaderService } from 'src/app/core/services/loader.service';
import { BloodRequestService } from 'src/app/service/request/request.service';
import { CalenderComponent } from '../../components/calender/calender.component';
import { RestService } from 'src/app/core/services/rest.service';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {
  @ViewChild('selectableState') selectableState: any = IonicSelectableComponent;
  @ViewChild('selectableCity') selectableCity: any = IonicSelectableComponent;
  states: any = [];
  cities: any = [];
  isFemale: boolean = false;
  bloodGroup:any = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  constructor(
    private service: BloodRequestService,
    private router: Router,
    private toast: ToastService,
    private spinner: LoaderService,
    private modalController: ModalController,
    private restService: RestService
  ) {}

  ngOnInit() {
    this.states = this.restService.getStatesOfCountry('IN');
  }

  bloodRequestForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    bloodRequireDate: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    hemoglobin: new FormControl('', [Validators.required]),
    illness: new FormControl('', [Validators.required]),
    units: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    fatherOrHusband: new FormControl(''),
    bloodGroup: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.bloodRequestForm.controls;
  }

  async create() {
    if (this.bloodRequestForm.invalid) {
      console.log(this.bloodRequestForm.controls);

      this.toast.successToast('Please fill required fields!');
      return;
    }
    await this.spinner.showLoader();
    this.service.create(this.bloodRequestForm.value).subscribe(
      async (success: any) => {
        this.toast.successToast(success.message);
        this.bloodRequestForm.reset();
        await this.spinner.hideLoader();
        this.router.navigate(['/layout/home']);
      },
      async (error: any) => {
        await this.spinner.hideLoader();
        this.toast.errorToast(error.error);
      }
    );
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
        this.f['bloodRequireDate'].setValue(data.data.date);
      }
    });
  }

  getCity(state: any) {
    this.f['state'].setValue(state.value.name);
    this.cities = this.restService.getCitiesOfState(
      state.value.countryCode,
      state.value.isoCode
    );
  }
  setCity(city: any) {
    this.f['city'].setValue(city.value.name);
  }

  checkGender() {
    console.log('this.f[].value',this.f['gender'].value);
    
    if (this.f['gender'].value == 'FEMALE') {
      this.isFemale = true;
    }else{
      this.isFemale = false;
    }
  }
 
}
