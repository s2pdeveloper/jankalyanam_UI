import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DonatePageRoutingModule } from './donate-routing.module';
import { DonatePage } from './donate.page';
import { SharedModule } from '../../components/shared/shared.module'; 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonatePageRoutingModule,
    ReactiveFormsModule,
    SharedModule, 
  ],
  declarations: [DonatePage],
})
export class DonatePageModule {}
