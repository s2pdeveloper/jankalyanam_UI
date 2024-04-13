import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { DonateService } from 'src/app/service/donate.service';
import { RestService } from 'src/app/service/res.service';

@Component({
  selector: 'app-donateblood',
  templateUrl: './donateblood.component.html',
  styleUrls: ['./donateblood.component.scss'],
})
export class DonatebloodComponent implements OnInit {
  states: any = [];
  cities: any = [];

  constructor(private donate: DonateService, private rest: RestService) {}

  ngOnInit(): void {
    this.states = this.rest.getStatesOfCountry('IN');
  }
  bloodGroup = [
    {"name":"A+"},
    {"name":"A-"},
    {"name":"B+"},
    {"name":"B-"},
    {"name":"AB+"},
    {"name":"AB-"},
    {"name":"O+"},
    {"name":"O-"}
   ]

   gender = [
    {"type":"MALE"},
    {"type":"FEMALE"},
    {"type":"OTHER"} 
   ]

  donateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    age: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(3),
    ]),
    bloodGroup: new FormControl('', [Validators.required]),
    hemoglobin: new FormControl('', [Validators.required]),
    donationDate: new FormControl('', [Validators.required]),
    illness: new FormControl(''),
    mobileNo: new FormControl('', [
      Validators.required,
      Validators.pattern('^[7-9][0-9]{9}$'),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    isWebsite: new FormControl(true),
  });

  submit() {
    console.log('this.donateForm.value', this.donateForm.value);
    this.donate.post(this.donateForm.value).subscribe((success) => {
      console.log('success of donate ', success);
      this.donateForm.reset();
    });
  }

  getCity(state: any) {
    console.log( state.target.value);
    this.cities = this.rest.getCitiesOfState(
      'IN',
      state.target.value
    );
  }
}
