import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StorageService, ToastService } from 'src/app/core/services';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CameraService } from 'src/app/service/camera.service';
import { LoaderService } from 'src/app/service/loader.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  async uploadFile() {
    this.cameraService.requestPermission();
    let image = await this.cameraService.openCamera();
    console.log('image', JSON.stringify(image));   
  }

  user: any;
  userData: any;
  isEditable : Boolean = false;
  constructor(
    private storage: StorageService,
    private router: Router,
    private service: AuthService,
    private toast: ToastService,
    private toastService: ToastService,
    private modalController: ModalController,
    private cameraService:CameraService, 
    private spinner: LoaderService,
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.userData = this.storage.get('user');
    console.log("this.userData----",this.userData);
    
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
    role: new FormControl('',),
    status: new FormControl('',),
  });

  getByIdData(id:any) {
    this.service.profile(id).subscribe((success: any) => {
      this.user = success;
      this.registrationForm.patchValue(success);
      console.log("profile",this.registrationForm);
    });
  }

  update() {
    let formData = this.registrationForm.value;
    this.service.updateUser(formData.id, formData).subscribe((success: any) => {
      this.toast.successToast('Profile Updated Successfully');
    });
  }

  toggle(){
    this.isEditable= ! this.isEditable;
  }
}

