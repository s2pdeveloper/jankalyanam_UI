import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestbloodRoutingModule } from './requestblood-routing.module';
import { RequestbloodComponent } from './requestblood.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    RequestbloodComponent
  ],
  imports: [
    CommonModule,
    RequestbloodRoutingModule, FormsModule, ReactiveFormsModule,HttpClientModule
  ]
})
export class RequestbloodModule { }
