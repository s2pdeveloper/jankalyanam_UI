import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ToastService } from 'src/app/core/services';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  constructor(private modalController: ModalController,
    private service: AuthService,
    private toast: ToastService,
  ) { }
  changePasswordForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
   
  });
  ngOnInit() {
  }
  dismiss() {
    this.modalController.dismiss();
  }
  onSubmit() {
    if (this.changePasswordForm.valid) {
      const userPayload = {
        newPassword: this.changePasswordForm.value.newPassword,
        password: this.changePasswordForm.value.password
      };
      this.service.setPassword(userPayload).subscribe(
        (response) => {
          this.toast.successToast('Profile PasswordUpdated Successfully');
        },
        (error) => {
          this.toast.successToast('Cant update-profile Successfully');
        }
      );
    } 
  }

}
