import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RequestPageRoutingModule } from './request-routing.module';
import { RequestPage } from './request.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestPageRoutingModule, ReactiveFormsModule
  ],
  declarations: [RequestPage]
})
export class RequestPageModule { }
