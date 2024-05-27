import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { LoaderService } from 'src/app/service/loader.service';
import { ToastService } from 'src/app/core/services';
@Component({
  selector: 'app-email-for-otp',
  templateUrl: './email-for-otp.page.html',
  styleUrls: ['./email-for-otp.page.scss'],
})
export class EmailForOtpPage implements OnInit {

  constructor(private router : Router, private service: AuthService, private toast: ToastService,
    private spinner: LoaderService, private activatedRoute: ActivatedRoute) { }

  email:string= null
  mobileNo:string=null;
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.mobileNo = this.activatedRoute.snapshot.paramMap.get("mobileNo")
    this.email = this.activatedRoute.snapshot.paramMap.get("email")
    console.log("data-------",this.mobileNo,this.email);
    
    // this.email = data['email'];
    // this.mobileNo = data['mobileNo'];
  }

  getOtp(){
    if(this.email == null){
      this.toast.errorToast("Please Fill The Email")
    }
    console.log('emailForm Form',this.email);
    this.service.otp(this.email,this.mobileNo).subscribe({
      next: (res) => {
       
        this.router.navigate(['/auth/verify-otp',{mobileNo:this.mobileNo}])
      },
      error: (err) => {
        
        this.toast.errorToast(err.message);
      },
    });
   
  }
}
