import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    name: new FormControl(''),
    gender: new FormControl(''),
    age: new FormControl(''),
    bloodGroup: new FormControl(''),
    hemoglobin: new FormControl(''),
    illness: new FormControl(''),
    mobileNo: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    bloodRequireDate: new FormControl(''),
    fatherOrHusband: new FormControl(''),
    location: new FormControl(''),
    units: new FormControl(''),
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

