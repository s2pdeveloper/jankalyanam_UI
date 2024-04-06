import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component'; 
import { CoreModule } from '../../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BloodRequestRoutingModule } from './blood-request-routing.module';
import { BloodRequestFormComponent } from './blood-request-form/blood-request-form.component';


@NgModule({
  declarations: [
    ListComponent,
    BloodRequestFormComponent
  ],
  imports: [
    CommonModule, 
    CoreModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,BloodRequestRoutingModule
  ]
})
export class BloodRequestModule { }
