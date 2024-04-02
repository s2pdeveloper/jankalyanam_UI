import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { AttenderRoutingModule } from './attender-routing.module';
import { CoreModule } from '../../core/core.module';



@NgModule({
  declarations: [
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,AttenderRoutingModule,CoreModule.forRoot()
  ]
})
export class AttenderModule { }
