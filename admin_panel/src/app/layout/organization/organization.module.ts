import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationListComponent } from './organization-list/organization-list.component';
import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { OrganizationRoutingModule } from './organization-routing.module';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    OrganizationListComponent,
    OrganizationFormComponent
  ],
  imports: [
    OrganizationRoutingModule, 
    CoreModule.forRoot(),CommonModule
  ]
})
export class OrganizationModule { }
