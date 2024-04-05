import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonatebloodRoutingModule } from './donateblood-routing.module';
import { DonatebloodComponent } from './donateblood.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    DonatebloodComponent
  ],
  imports: [
    CommonModule,
    DonatebloodRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule
  ]
})
export class DonatebloodModule { 

}
