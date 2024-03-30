import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/core/services';
import { LoaderService } from 'src/app/core/services/loader.service';
import { BloodDonationService } from 'src/app/service/donation/donation.service';
import { CalenderComponent } from '../../components/calender/calender.component';
import { IonicSelectableComponent } from 'ionic-selectable';
import { RestService } from 'src/app/core/services/rest.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {
  @ViewChild('selectableState') selectableState: any = IonicSelectableComponent;
  @ViewChild('selectableCity') selectableCity: any = IonicSelectableComponent;
  states: any = [];
  cities: any = [];
  bloodGroup:any = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  constructor(
    private service: BloodDonationService,
    private router: Router,
    private toast: ToastService,
    private spinner: LoaderService,
    private modalController: ModalController,
    private restService: RestService
  ) {}

  ngOnInit() {
    this.states = this.restService.getStatesOfCountry('IN');
  }

  bloodDonateForm = new FormGroup({
    age: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    donationDate: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    hemoglobin: new FormControl('', [Validators.required]),
    illness: new FormControl(false, [Validators.required]),
    mobileNo: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    bloodGroup: new FormControl('', [Validators.required]),
    // location: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.bloodDonateForm.controls;
  }

  async create() {
    

    if (this.bloodDonateForm.invalid) {
      console.log(this.bloodDonateForm.controls);

      this.toast.successToast('Please fill required fields!');
      return;
    }
  
    await this.spinner.showLoader();
    this.service.create(this.bloodDonateForm.value).subscribe(
      async (success: any) => {
        this.toast.successToast(success.message);
        this.bloodDonateForm.reset();
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
        this.f['donationDate'].setValue(data.data.date);
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
}
