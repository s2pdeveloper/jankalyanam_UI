import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestMylistDetailPageRoutingModule } from './request-mylist-detail-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicSelectableComponent } from "ionic-selectable";
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestMylistDetailPage } from './request-mylist-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestMylistDetailPageRoutingModule,
    ReactiveFormsModule,
    IonicSelectableComponent,
    SharedModule
 
  ],
  declarations: [RequestMylistDetailPage]
})
export class RequestMylistDetailPageModule {}
