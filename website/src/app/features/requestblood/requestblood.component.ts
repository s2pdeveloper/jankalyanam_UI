import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestService } from 'src/app/service/request.service';
import { RestService } from 'src/app/service/res.service';

@Component({
  selector: 'app-requestblood',
  templateUrl: './requestblood.component.html',
  styleUrls: ['./requestblood.component.scss']
})
export class RequestbloodComponent implements OnInit{
  states: any = [];
  cities: any = [];
  constructor(private request : RequestService,  private rest: RestService){}

  ngOnInit(): void {
    this.states = this.rest.getStatesOfCountry('IN');

    console.log(this.states);
    
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

  requestForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    gender: new FormControl('',  [Validators.required]),
    age: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(3),
    ]),
    bloodGroup: new FormControl('', [Validators.required]),
    hemoglobin: new FormControl('', [Validators.required]),
    illness: new FormControl(''),
    mobileNo: new FormControl('', [
      Validators.required,
      Validators.pattern('^[7-9][0-9]{9}$'),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    city: new FormControl('',  [Validators.required]),
    state: new FormControl('',  [Validators.required]),
    bloodRequireDate: new FormControl('',  [Validators.required]),
    fatherOrHusband: new FormControl('', [Validators.required]),
    location: new FormControl('',  [Validators.required]),
    units: new FormControl('',  [Validators.required]),
    isWebsite: new FormControl(true)
  });

  submit(){
    console.log("this.requestForm.value",this.requestForm.value);
    this.request.post(this.requestForm.value).subscribe(success => {
      console.log("success of donate ",success);
      this.requestForm.reset();
    })
  }
  getCity(state: any) {
    console.log( state.target.value);
    this.cities = this.rest.getCitiesOfState(
      'IN',
      state.target.value
    );
  }
}

