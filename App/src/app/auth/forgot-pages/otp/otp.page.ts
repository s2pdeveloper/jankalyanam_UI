import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { LoaderService } from 'src/app/service/loader.service';
import { ToastService } from 'src/app/core/services';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  constructor(private router : Router, private service: AuthService, private toast: ToastService,
    private spinner: LoaderService, private activatedRoute: ActivatedRoute) { }
  otp:any= null;
  mobileNo:string=null;
  ngOnInit() {
  }
  
 


  ionViewWillEnter(){
    this.mobileNo = this.activatedRoute.snapshot.paramMap.get("mobileNo")

  }

  verifyOtp(){
    if(this.otp == null){
      this.toast.errorToast("Please Fill The OTP")
    }
    console.log('emailForm Form',this.otp);
    this.service.verifyOTP(this.otp,this.mobileNo).subscribe({
      next: (res) => {
       
        this.router.navigate(['/auth/new-password',{mobileNo:this.mobileNo}])
      },
      error: (err) => {
        
        this.toast.errorToast(err.message);
      },
    });
   
  }
  

}
