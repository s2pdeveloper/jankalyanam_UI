import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService, ToastService } from 'src/app/core/services';
import { RestService } from 'src/app/core/services/rest.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CalenderComponent } from 'src/app/shared/models/calender/calender.component';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userData: any;
  isCity: boolean = false;
  bloodGroup: any = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
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
  loader: boolean = false;

  constructor(
    private storage: StorageService,
    private router: Router,
    private service: AuthService,
    private toast: ToastService,
    private restService: RestService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.loader = true;

    this.service.getAllState().subscribe(
      (success: any) => {
        this.states = success;
        this.userData = this.storage.get('user');
        this.getByIdData(this.userData.id);
        this.loader = false;
      },
      (error: any) => {
        this.loader = false;
      }
    );

    // this.userData = this.storage.get('user');
    // this.getByIdData(this.userData.id);
    // this.states = this.restService.getStatesOfCountry('IN');
  }
  editRegistrationForm = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required]),
    bloodGroup: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    district: new FormControl(),
    tahsil: new FormControl(),
    village: new FormControl(),
    DOB: new FormControl(),
  });

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
      if (data.data && data.data.date) {
        this.f[field].setValue(data.data.date);
      }
    });
  }

  get f() {
    return this.editRegistrationForm.controls;
  }
  getByIdData(id: any) {
    this.service.profile(id).subscribe((success: any) => {
      if (success.state && this.states) {
        this.selectTable.state = this.states.find(
          (x) => x.stateName == success.state
        );
      }
      if (success.district && this.selectTable.state) {
        this.service
          .getDistrictByStateId(this.selectTable.state.id)
          .pipe(
            switchMap((districts) => {
              this.district = districts;
              this.selectTable.district = districts.find(
                (x) => x.districtName == success.district
              );

              return this.selectTable.district
                ? this.service.getTahsilByDistrictId(
                    this.selectTable.district.id
                  )
                : of(null);
            }),
            switchMap((tahsils) => {
              if (tahsils) {
                this.tehsil = tahsils;
                if (success.tahsil) {
                  this.selectTable.tahsil = tahsils.find(
                    (x) => x.tehsilName == success.tehsil
                  );
                }

                return this.selectTable.tahsil
                  ? this.service.getVillageByTahsilId(
                      this.selectTable.tahsil.id
                    )
                  : of(null);
              }
              return of(null);
            })
          )
          .subscribe((villages) => {
            if (villages) {
              this.village = villages;
              if (success.village) {
                this.selectTable.village = villages.find(
                  (x) => x.villageName == success.village
                );
              }
            }
          });
      }
      this.editRegistrationForm.patchValue(success);
    });
  }

  update() {
    let formData = this.editRegistrationForm.value;
    this.service.updateUser(formData.id, formData).subscribe((success: any) => {
      this.toast.successToast('Profile Updated Successfully');
      success.token = this.userData.token;
      this.storage.set('user', success);
      this.router.navigate(['/auth/profile']);
    });
  }
  // getCity(state: any) {
  //   this.f['state'].setValue(state.value.name);
  //   this.isCity = true;
  //   this.cities = this.restService.getCitiesOfState(
  //     state.value.countryCode,
  //     state.value.isoCode
  //   );
  // }
  setCity(city: any) {
    this.f['city'].setValue(city.value.name);
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
}
