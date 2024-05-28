import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { LoaderService } from 'src/app/service/loader.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { RestService } from 'src/app/core/services/rest.service';
import { ModalController } from '@ionic/angular';
import { CalenderComponent } from 'src/app/shared/models/calender/calender.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(
    private router: Router,
    private service: AuthService,
    private toast: ToastService,
    private spinner: LoaderService,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController
  ) {}
  states: any = [
    {
      id: 1,
      stateName: 'Andhra Pradesh',
    },
    {
      id: 2,
      stateName: 'Arunachal Pradesh',
    },
    {
      id: 3,
      stateName: 'Assam',
    },
  ];
  district: any = [
    {
      id: 2,
      districtName: 'Anantapur',
      stateId: 1,
      districtTahsil: [],
    },

    {
      id: 14,
      districtName: 'YSR Kadapa',
      stateId: 1,
      districtTahsil: [],
    },
  ];
  tehsil: any = [];
  village: any = [];
  selectTable = {
    state: null,
    district: null,
    tahsil: null,
    village: null,
  };
  bloodGroup: any = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  @ViewChild('selectableState') selectableState: any = IonicSelectableComponent;
  ngOnInit() {}
  registrationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [
      Validators.required,
      Validators.maxLength(12),
      Validators.minLength(10),
    ]),
    DOB: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    bloodGroup: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    tahsil: new FormControl(''),
    village: new FormControl(''),
    role: new FormControl('ATTENDER'),
  });

  ionViewWillEnter() {
    this.activatedRoute.snapshot.paramMap.get('value') == 'true';
    console.log('inside the Appp-----');

    // this.service.getAllState().subscribe((success: any) => {
    //   // this.states = success;
    //   // console.log('this.listData-----', this.states);
    // });
  }
  get f() {
    return this.registrationForm.controls;
  }

  getDistrictByStateId() {
    this.selectTable.tahsil = null;
    this.selectTable.village = null;
    this.selectTable.district = null;
    this.tehsil = [];
    this.village = [];

    this.service
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
    this.service
      .getTahsilByDistrictId(this.selectTable.district.id)
      .subscribe((success: any) => {
        this.tehsil = success;
      });
  }

  getVillageByTahsilId() {
    this.selectTable.village = null;
    this.service
      .getVillageByTahsilId(this.selectTable.tahsil.id)
      .subscribe((success: any) => {
        this.village = success;
      });
  }

  // getDistrict() {
  //   console.log('this.selectTable.state--', this.selectTable.state);

  //   if (this.selectTable.state) {
  //     this.selectTable.tahsil = null;
  //     this.selectTable.village = null;
  //     this.selectTable.district = null;
  //     this.tehsil = [];
  //     this.village = [];
  //     const matchingItem = this.listData.find(
  //       (data) => data.stateName === this.selectTable.state.stateName
  //     );
  //     this.district = matchingItem ? matchingItem.stateDistrict : null;

  //     console.log('district-----', this.district);
  //   }
  // }
  // getTahsil() {
  //   if (this.selectTable.district) {
  //     this.selectTable.tahsil = null;
  //     this.selectTable.village = null;
  //     this.tehsil = [];
  //     this.village = [];
  //     const matchingItem = this.district.find(
  //       (data) => data.districtName === this.selectTable.district.districtName
  //     );
  //     this.tehsil = matchingItem ? matchingItem.districtTahsil : null;

  //     console.log('tehsil-----', this.tehsil);
  //   }
  // }
  // getVillage() {
  //   if (this.selectTable.tahsil) {
  //     this.selectTable.village = null;
  //     const matchingItem = this.tehsil.find(
  //       (data) => data.tahsilName === this.selectTable.tahsil.tahsilName
  //     );
  //     this.village = matchingItem ? matchingItem.tahsilVillage : null;

  //     console.log('village-----', this.village);
  //   }
  // }
  // setVillage(event){
  //   if (event && event.value && event.value.villageName) {
  //     this.f["village"].setValue(event.value.villageName);
  //   }

  // }
  // patchSelectTableData() {
  //   for (const key in this.selectTable) {
  //     // if (this.selectTable[key] && Array.isArray(this.selectTable[key])) {
  //     //   this.registrationForm[key].setValue(this.selectTable[key].map(x => x.ccode));
  //     // } else if (this.selectTable[key] && this.selectTable[key]?.ccode) {
  //     //   this.registrationForm[key].setValue(this.selectTable[key].ccode);
  //     // }
  //   }
  // }
  async register() {
    if (this.registrationForm.invalid) {
      this.toast.successToast('Please fill required fields!');
      return;
    }
    let formValue = this.registrationForm.value;
    if (!!this.selectTable.state) {
      formValue.state = this.selectTable.state.stateName;
    }
    if (!!this.selectTable.district) {
      formValue.district = this.selectTable.district.districtName;
    }
    if (!!this.selectTable.tahsil) {
      formValue.tahsil = this.selectTable.tahsil.tahsilName;
    }
    if (!!this.selectTable.village) {
      formValue.village = this.selectTable.village.villageName;
    }
    await this.spinner.show();
    this.service.register(formValue).subscribe(
      async (success: any) => {
        this.toast.successToast(success.message);
        this.registrationForm.reset();
        await this.spinner.hide();
        this.router.navigate(['/auth/login']);
      },
      async (error: any) => {
        await this.spinner.hide();
        this.toast.errorToast(error.error);
      }
    );
  }
  async openCalender(field: any) {
    let date = this.f[field].value
      ? new Date(this.f[field].value).toISOString()
      : new Date().toISOString;
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
}
