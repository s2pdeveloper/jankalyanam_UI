import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DonationDetailsComponent } from './models/donation-details/donation-details.component';

const models:any[]=[DonationDetailsComponent];
const pipes:any[]=[]

@NgModule({
  declarations: [...models,...pipes],
  exports: [...models,...pipes],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
