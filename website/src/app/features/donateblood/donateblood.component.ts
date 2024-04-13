import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    name: new FormControl(''),
    gender: new FormControl(''),
    age: new FormControl(''),
    bloodGroup: new FormControl(''),
    hemoglobin: new FormControl(''),
    donationDate: new FormControl(''),
    illness: new FormControl(''),
    mobileNo: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
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
