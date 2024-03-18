import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerRoutingModule  } from './customer-routing.module';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerFormComponent
  ],
  imports: [
    CustomerRoutingModule, 
    CoreModule.forRoot(),
    CommonModule
  ]
})
export class CustomerModule { }
