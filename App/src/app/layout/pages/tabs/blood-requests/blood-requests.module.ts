import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BloodRequestsPageRoutingModule } from './blood-requests-routing.module';

import { BloodRequestsPage } from './blood-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BloodRequestsPageRoutingModule
  ],
  declarations: [BloodRequestsPage]
})
export class BloodRequestsPageModule {}
