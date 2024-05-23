import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetNewPasswordPageRoutingModule } from './set-new-password-routing.module';

import { SetNewPasswordPage } from './set-new-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetNewPasswordPageRoutingModule,ReactiveFormsModule
  ],
  declarations: [SetNewPasswordPage]
})
export class SetNewPasswordPageModule {}
