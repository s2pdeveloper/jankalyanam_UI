import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DonateRoutingModule } from './donate-routing.module';
import { CoreModule } from '../../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DonateFormComponent } from './donate-form/donate-form.component';

@NgModule({
  declarations: [ListComponent, DonateFormComponent],
  imports: [
    CommonModule,
    DonateRoutingModule,
    CoreModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class DonateModule {}
