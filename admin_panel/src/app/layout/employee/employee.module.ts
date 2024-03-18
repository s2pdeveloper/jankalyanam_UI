import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import {EmployeeRoutingModule} from './employee-routing.module';
import { CoreModule } from 'src/app/core/core.module';

 


@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeFormComponent
  ],
  imports: [
    CommonModule,EmployeeRoutingModule, CoreModule.forRoot()
  ]
})
export class EmployeeModule { }
