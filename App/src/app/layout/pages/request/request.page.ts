import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  bloodRequestForm = new FormGroup({
    age: new FormControl(''), //
    bloodGroup:new FormControl(''),//
    bloodRequireDate: new FormControl(''),
    city: new FormControl(''),
    hemoglobin: new FormControl(''),
    illness: new FormControl(''),
    location: new FormControl(''),
    mobileNo: new FormControl(''),
    name: new FormControl(''),//
    state: new FormControl(''),
    units: new FormControl(''),
    gender: new FormControl('')
  });



  // {
  //   "age": 0,
  //   "bloodGroup": "string",
  //   "bloodRequireDate": "2024-03-21T07:15:41.087Z",
  //   "city": "string",
  //   "hemoglobin": 0,
  //   "illness": "string",
  //   "location": "string",
  //   "mobileNo": 0,
  //   "name": "string",
  //   "state": "string",
  //   "units": 1
  // }

//   location
// Father or husband
}
