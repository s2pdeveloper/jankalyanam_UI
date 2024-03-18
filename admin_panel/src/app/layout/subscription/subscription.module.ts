import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import {SubscriptionRoutingModule} from './subscription-routing.module'



@NgModule({
  declarations: [
    SubscriptionListComponent,
    SubscriptionFormComponent
  ],
  imports: [
    CommonModule,SubscriptionRoutingModule
  ]
})
export class SubscriptionModule { }
