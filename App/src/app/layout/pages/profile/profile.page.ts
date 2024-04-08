import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ToastService } from 'src/app/core/services';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  userData: any;
  constructor(
    private storage: StorageService,
    private router: Router,
    private service: AuthService,
    private toast: ToastService,
    private spinner: LoaderService,
    private toastService: ToastService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.userData = this.storage.get('user');
    if (this.userData.id) {
      this.getByIdData(this.userData.id);
    }
  }
  registrationForm = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.registrationForm.controls;
  }

  getByIdData(id) {
    this.service.profile(id).subscribe((success: any) => {
      this.registrationForm.patchValue(success);
    });
  }
  update() {
    let formData = this.registrationForm.value;
    this.service.updateUser(formData.id, formData).subscribe((success: any) => {
      this.toast.successToast('Profile Updated Successfully');
    });
  }
}
