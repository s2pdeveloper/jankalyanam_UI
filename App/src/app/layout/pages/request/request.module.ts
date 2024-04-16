import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RequestPageRoutingModule } from './request-routing.module';
import { RequestPage } from './request.page';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [RequestPage],
})
export class RequestPageModule {}
