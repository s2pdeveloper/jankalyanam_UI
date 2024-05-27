import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { LoaderService } from 'src/app/service/loader.service';
import { ToastService } from 'src/app/core/services';
@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.page.html',
  styleUrls: ['./set-new-password.page.scss'],
})
export class SetNewPasswordPage implements OnInit {
  password:any= null;
  mobileNo:string=null;

  constructor(private router : Router, private service: AuthService, private toast: ToastService,
    private spinner: LoaderService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.mobileNo = this.activatedRoute.snapshot.paramMap.get("mobileNo")

  }


  newPassword(){
    if(this.password == null){
      this.toast.errorToast("Please Fill The Password")
    }
    console.log('Form',this.password,this.mobileNo);
    this.service.setPassword(this.password,this.mobileNo).subscribe({
      next: (res) => {
       
        this.router.navigate(['/auth/login'])
      },
      error: (err) => {
        
        this.toast.errorToast(err.message);
      },
    });
   
  }
}
