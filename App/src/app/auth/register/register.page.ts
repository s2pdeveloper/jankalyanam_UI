import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  registrationForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    mobileNo: new FormControl(''),
    password: new FormControl(''),
  });

  register(){
    console.log('register',this.registrationForm.value);
    
  }



  
}
