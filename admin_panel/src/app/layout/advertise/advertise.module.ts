 
import { FormComponent } from './form/form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component'; 
import { CoreModule } from '../../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import{AdvertiseRoutingModule} from './advertise-routing.module'

@NgModule({
  declarations: [
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule, 
    CoreModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,AdvertiseRoutingModule
  ]
})
export class AdvertiseModule { }
