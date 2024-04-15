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
  user: any;
  userData: any;
  isEditable : Boolean = false;
  profile:string=null;
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

  async uploadFile() {
    this.cameraService.requestPermission();
    let image = await this.cameraService.openCamera();
    console.log('image---------', JSON.stringify(image));   
    let imageBlob = await this.cameraService.b64toBlob(image.base64String,`image/${image.format}`)
  console.log("imageBlob---------",imageBlob,image.format);
  
    const formData = new FormData();
    formData.append('id',this.userData.id);
     formData.append('image', imageBlob, `${this.userData.firstName}_${this.userData.id}`);
     this.service.updateImage(formData).subscribe((success: any) => {
      console.log('success getByIdData',success);
      this.profile =success.image;
    },(error) => {
      this.toast.errorToast(error.message);
    });
    }

  getByIdData(id:any) {
    this.service.profile(id).subscribe((success: any) => {
      console.log('success getByIdData',success);
      this.user = success;
      this.registrationForm.patchValue(success);
    },(error) => {
      this.toast.errorToast(error.message);
    });
  }

  update() {
    let formData = this.registrationForm.value;
    this.service.updateUser(formData.id, formData).subscribe((success: any) => {
      this.toast.successToast('Profile Updated Successfully');
    },(error) => {
      this.toast.errorToast(error.message);
    });
  }

  toggle(){
    this.isEditable= ! this.isEditable;
  }

  navigate(){
    const userId = this.registrationForm.value.id;
    this.router.navigate(['/auth/edit-profile'],{ queryParams: { id: userId } })
    console.log("---id",userId);
    
  }
}

