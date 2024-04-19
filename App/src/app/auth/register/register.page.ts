import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/services';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(
    private router: Router,
    private service: AuthService,
    private toast: ToastService,
    private spinner: LoaderService
  ) {}

  ngOnInit() {}
  registrationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required,Validators.maxLength(12),Validators.minLength(10)]),
    password: new FormControl('', [Validators.required]),
    role:new FormControl('ATTENDER'),
  });

  async register() {
    if (this.registrationForm.invalid) {
      this.toast.successToast('Please fill required fields!');
      return;
    }
    await this.spinner.show();
    this.service.register(this.registrationForm.value).subscribe(
      async (success: any) => {
        this.toast.successToast(success.message);
        this.registrationForm.reset();
        await this.spinner.hide();
        this.router.navigate(['/auth/login']);
      },
      async (error: any) => {
        await this.spinner.hide();
        this.toast.errorToast(error.error);
      }
    );
  }
}
