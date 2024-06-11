import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BloodDonationsPageRoutingModule } from './blood-donations-routing.module';

import { BloodDonationsPage } from './blood-donations.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BloodDonationsPageRoutingModule,
    SharedModule
  ],
  declarations: [BloodDonationsPage],
  exports: []
})
export class BloodDonationsPageModule { }
