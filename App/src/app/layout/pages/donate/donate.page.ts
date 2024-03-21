import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }



  
  bloodDonateForm = new FormGroup({
    age : new FormControl(''), 
    city : new FormControl(''), 
    donationDate : new FormControl(''), 
    hemoglobin : new FormControl(''),
    blood_group  : new FormControl(''), 
    location  : new FormControl(''), 
    illness : new FormControl(''), 
    mobileNo : new FormControl(''), 
    name : new FormControl(''), 
    state : new FormControl(''), 
    gender : new FormControl(''), 
  });

  // {
  //   "age": 25,
  //   "city": "Nagpur",
  //   "donationDate": "",
  //   "hemoglobin": 10,
  // "blood_group" : "B+",
  // "location" : "Gandhibagh" ,
  //   "illness": true,
  //   "mobileNo": "8669847752",
  //   "name": "Aditya",
  //   "state": "Maharastra" 
  //gender
  
  // }
}
