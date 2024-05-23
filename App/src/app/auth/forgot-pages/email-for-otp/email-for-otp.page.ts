import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-email-for-otp',
  templateUrl: './email-for-otp.page.html',
  styleUrls: ['./email-for-otp.page.scss'],
})
export class EmailForOtpPage implements OnInit {

  constructor(private router : Router) { }


  ngOnInit() {
  }
  emailForm = new FormGroup({
    email: new FormControl('test@gmail.com')
  });

  getOtp(){
    console.log('emailForm Form',this.emailForm.value);
    this.router.navigate(['/auth/verify-otp'])
  }
}
