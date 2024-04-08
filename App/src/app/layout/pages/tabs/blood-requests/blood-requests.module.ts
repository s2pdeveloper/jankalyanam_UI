import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BloodRequestsPageRoutingModule } from './blood-requests-routing.module';

import { BloodRequestsPage } from './blood-requests.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    BloodRequestsPageRoutingModule,
    SharedModule
  ],
  declarations: [BloodRequestsPage]
})
export class BloodRequestsPageModule {}
