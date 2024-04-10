import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ToastService } from 'src/app/core/services';
import { LoaderService } from 'src/app/core/services/loader.service';
import { StorageService } from 'src/app/core/services';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private router: Router,
    private service: AuthService,
    private toast: ToastService,
    private spinner: LoaderService,
    private storage: StorageService
  ) {}

  ngOnInit() {}

  loginForm = new FormGroup({
    mobileNo: new FormControl(''),
    password: new FormControl(''),
  });

  navigateTo(url: string) {
    console.log(url);
    this.router.navigate([url]);
  }

  async login() {
    if (this.loginForm.invalid) {
      this.toast.successToast('Please fill required fields!');
      return;
    }
    await this.spinner.showLoader();
    this.service.login(this.loginForm.value).subscribe(
      async (success: any) => {
        await this.spinner.hideLoader();
        this.loginForm.reset();
        this.storage.set('user', success);
        this.deviceToken();
        this.router.navigate(['/layout/home']);
      },
      async (error: any) => {
        await this.spinner.hideLoader();
        this.toast.errorToast(error.message);
      }
    );
  }

  async deviceToken() {
console.log("this.storage.get('deviceToken')===",localStorage.getItem('deviceToken'));

    if(localStorage.getItem('deviceToken')){
      this.service.addDeviceId(localStorage.getItem('deviceToken')).subscribe(
        { 
          next:(success: any) => {
        },
       error:  (error: any) => {
          // await this.spinner.hideLoader();
          // this.toast.errorToast(error.message);
        }
      }
      );
    }
    }
  
}
