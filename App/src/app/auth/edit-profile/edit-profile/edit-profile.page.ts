import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService, ToastService } from 'src/app/core/services';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userData: any;
    constructor( private storage: StorageService, private service: AuthService,private toast: ToastService,) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.userData = this.storage.get('user');
    console.log("this.userData in edit----",this.userData);
    this.getByIdData(this.userData.id);
    console.log('this.userData.id',this.userData.id);
    
  }
  editRegistrationForm = new FormGroup({
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
      console.log('success getByIdData',success);
      this.editRegistrationForm.patchValue(success)
    });
  }

  update() {
    let formData = this.editRegistrationForm.value;
    this.service.updateUser(formData.id, formData).subscribe((success: any) => {
      console.log('success of update',success);
      this.toast.successToast('Profile Updated Successfully');
    });
  }
}
