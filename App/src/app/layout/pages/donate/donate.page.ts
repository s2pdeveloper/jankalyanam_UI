import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonCheckbox, IonModal, ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/core/services';
import { BloodDonationService } from 'src/app/service/donation/donation.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { RestService } from 'src/app/core/services/rest.service';
import { AdminRequestActiveComponent } from 'src/app/shared/models/admin-request-active/admin-request-active.component';
import { ModalService } from 'src/app/service/modal.service';
import { CalenderComponent } from 'src/app/shared/models/calender/calender.component';
import { LoaderService } from 'src/app/service/loader.service';
import { OverlayEventDetail } from '@ionic/core/components';
@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {
  @ViewChild('selectableState') selectableState: any = IonicSelectableComponent;
  @ViewChild('selectableCity') selectableCity: any = IonicSelectableComponent;
  userDetails: any = {};
  states: any = [];
  district: any = [];
  tehsil: any = [];
  village: any = [];
  cities: any = [];
  isFemale: boolean = false;
  bloodGroup: any = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  bloodRequest: Boolean = false;
  donationDateSelected: Boolean = false;
  disabledCity: Boolean = true;
  isCity: boolean = false;
  translatedName: string = '';
  setModal: boolean = false; 
  hemoglobin:any=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]


  constructor(
    private service: BloodDonationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: ToastService,
    private spinner: LoaderService,
    private modalController: ModalController,
    private restService: RestService,
    private modalService: ModalService
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.patchInitialDetails();

    this.bloodRequest =
      this.activatedRoute.snapshot.paramMap.get('value') == 'true';
    this.states = this.restService.getStatesOfCountry('IN');
    console.log('this.states-----', this.states);
  }

  bloodDonateForm = new FormGroup({
    age: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    donationDate: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    hemoglobin: new FormControl('', [Validators.required]),
    illness: new FormControl(false, []),
    mobileNo: new FormControl('', [
      Validators.required,
      Validators.maxLength(12),
      Validators.minLength(10),
    ]),
    name: new FormControl('', [Validators.required]),
    state: new FormControl(),
    bloodGroup: new FormControl('', [Validators.required]),
    district: new FormControl(),
    fatherOrHusband: new FormControl(""),
    tehsil: new FormControl(),
    village: new FormControl(),
  });

  get f() {
    return this.bloodDonateForm.controls;
  }

  async create() {
    if (!this.isTermsAgreed) {
      console.log(this.bloodDonateForm.controls);

      this.toast.errorToast('Please fill required fields!');
      return;
    }

    await this.spinner.show();
    this.service.create(this.bloodDonateForm.value).subscribe(
      async (success: any) => {
        this.toast.successToast('Donar Created Successfully!');
        // this.bloodDonateForm.reset();
        await this.spinner.hide();
        if (this.bloodRequest) {
          this.router.navigate(['/layout/request-mylist-detail'], {
            state: { success },
          });
        } else {
          this.router.navigate(['/layout/home']);
        }
      },
      async (error: any) => {
        await this.spinner.hide();
        this.toast.errorToast(error.message);
      }
    );
  }

  ionViewWillLeave() {
    this.bloodDonateForm.reset();
  }
  checkGender() {
    console.log('this.f[].value', this.f['gender'].value);

    if (this.f['gender'].value == 'FEMALE') {
      this.isFemale = true;
    } else {
      this.isFemale = false;
    }
  }

  async openCalender(field: any) {
    let date = this.f[field].value
      ? new Date(this.f[field].value).toISOString()
      : new Date().toISOString();
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
        this.f[field].setValue(data.data.date);
      }
    });
  }

  getCity(state: any) {
    if (state && state.value && state.value.name) {
      this.f['state'].setValue(state.value.name);
      this.isCity = true;
      this.disabledCity = false;
      this.cities = this.restService.getCitiesOfState(
        state.value.countryCode,
        state.value.isoCode
      );
    } else {
      this.disabledCity = true;
      this.cities = [];
      console.log('it is disabled');
    }
  }
  setCity(city: any) {
    this.f['city'].setValue(city.value.name);
  }
  navigate() {
    if (this.bloodRequest) {
      this.router.navigate(['/layout/request-mylist-detail'], {});
    } else {
      this.router.navigate(['/layout/home']);
    }
  }

  // model

  @ViewChild(IonModal) modal: IonModal;
  @ViewChild('openModalCheckbox', { static: false })
  openModalCheckbox: IonCheckbox;

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;
  isTermsAgreed: boolean = false;
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    console.log('ev--------->', ev);

    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    } else if (ev.detail.role === 'cancel') {
      this.openModalCheckbox.checked = false;
    }
  }

  patchInitialDetails() {
    this.userDetails = JSON.parse(localStorage.getItem('user'));
    this.f['name'].setValue(
      this.userDetails.firstName + ' ' + this.userDetails.lastName
    );
    this.f['bloodGroup'].setValue(this.userDetails.bloodGroup);
    this.f['mobileNo'].setValue(this.userDetails.mobileNo);
    this.f['state'].setValue(this.userDetails.state);
    this.f['district'].setValue(this.userDetails.district);
    this.f['tehsil'].setValue(this.userDetails.tehsil);
    this.f['village'].setValue(this.userDetails.village);
  }

  handleModal(modalValue: boolean) {
    this.setModal = modalValue;
  }

  acceptTermsAndCond() {
    this.isTermsAgreed = true;
    this.setModal = false
    
  }
}
