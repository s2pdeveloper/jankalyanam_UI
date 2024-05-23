import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailForOtpPageRoutingModule } from './email-for-otp-routing.module';

import { EmailForOtpPage } from './email-for-otp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailForOtpPageRoutingModule,ReactiveFormsModule
  ],
  declarations: [EmailForOtpPage]
})
export class EmailForOtpPageModule {}
