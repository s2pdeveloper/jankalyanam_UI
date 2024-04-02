import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  constructor(private modalController: ModalController) { }
  changepasswordForm = new FormGroup({
    newpassword: new FormControl('', [Validators.required]),
    confirmpassword: new FormControl('', [Validators.required]),
   
  });
  ngOnInit() {
  }
  dismiss() {
    this.modalController.dismiss();
  }
}
