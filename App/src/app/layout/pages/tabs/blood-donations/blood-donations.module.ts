import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BloodDonationsPageRoutingModule } from './blood-donations-routing.module';

import { BloodDonationsPage } from './blood-donations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BloodDonationsPageRoutingModule
  ],
  declarations: [BloodDonationsPage]
})
export class BloodDonationsPageModule {}
