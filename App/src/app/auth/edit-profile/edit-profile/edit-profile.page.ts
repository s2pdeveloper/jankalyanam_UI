import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService, ToastService } from 'src/app/core/services';
import { RestService } from 'src/app/core/services/rest.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userData: any;
  isCity: boolean = false;
  cities: any = [];
  states : any =[];
    constructor( private storage: StorageService, private router: Router,private service: AuthService,private toast: ToastService, private restService: RestService) { }

  ngOnInit() {
  }
  

  ionViewWillEnter() {
    this.userData = this.storage.get('user');
    console.log("this.userData in edit----",this.userData);
    this.getByIdData(this.userData.id);
    console.log('this.userData.id',this.userData.id);
    this.states = this.restService.getStatesOfCountry("IN");
    
  }
  editRegistrationForm = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    role: new FormControl('',),
    status: new FormControl('',),
  });

  get f() {
    return this.editRegistrationForm.controls;
  }
  getByIdData(id:any) {
    this.service.profile(id).subscribe((success: any) => {
      console.log('success getByIdData',success);
      this.editRegistrationForm.patchValue(success)
    });
  }

  update() {
    let formData = this.editRegistrationForm.value;
    this.service.updateUser(formData.id, formData).subscribe((success: any) => {
      console.log('success of update',success);
      this.toast.successToast('Profile Updated Successfully');
      this.router.navigate(["/auth/profile"])
    });
  }
  getCity(state: any) {
    this.f["state"].setValue(state.value.name);
    this.isCity = true;
    this.cities = this.restService.getCitiesOfState(
      state.value.countryCode,
      state.value.isoCode
    );
  }
  setCity(city: any) {
    this.f["city"].setValue(city.value.name);
  }
}
