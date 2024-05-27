import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { LoaderService } from 'src/app/service/loader.service';
import { ToastService } from 'src/app/core/services';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(private router : Router, private service: AuthService, private toast: ToastService,
    private spinner: LoaderService, private activatedRoute: ActivatedRoute) { }
    mobileNo:string = null;
  ngOnInit() {
  }

 

  verifyNumber(){
    console.log('mobileNo---',this.mobileNo);
    if(this.mobileNo == null){
      this.toast.errorToast("Please Enter The Mobile No");
    }

    this.service.forgetPassword(this.mobileNo).subscribe({
      next: (res) => {
        const item = {
          'mobileNo':this.mobileNo,
           'email':res.email
           }
        this.router.navigate(['/auth/email-for-otp',item])
      },
      error: (err) => {
        
        this.toast.errorToast(err.message);
      },
    });
   
  }

}
