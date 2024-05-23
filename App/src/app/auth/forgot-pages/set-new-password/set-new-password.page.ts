import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.page.html',
  styleUrls: ['./set-new-password.page.scss'],
})
export class SetNewPasswordPage implements OnInit {


 
  constructor(private router : Router) { }

  ngOnInit() {
  }
  newPasswordForm = new FormGroup({
    password: new FormControl('')
  });

  newPassword(){
    console.log('forgot Form',this.newPasswordForm.value);
    this.router.navigate(['/auth/login'])

  }
}
