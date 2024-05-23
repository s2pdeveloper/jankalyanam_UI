import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  
  otpForm = new FormGroup({
    otp: new FormControl('8767')
  });

  verifyOtp(){
    console.log('otpForm Form',this.otpForm.value);
    this.router.navigate(['/auth/new-password'])
  }
  

}
