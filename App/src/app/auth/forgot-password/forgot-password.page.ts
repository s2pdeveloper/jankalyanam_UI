import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  forgotForm = new FormGroup({
    mobileNo: new FormControl('9999999999')
  });

  verifyNumber(){
    console.log('forgot Form',this.forgotForm.value);
    this.router.navigate(['/auth/email-for-otp'])
  }

}
