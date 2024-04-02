import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonationDetailsComponent } from './models/donation-details/donation-details.component';
import { DonationHistoryComponent } from './models/donation-history/donation-history.component';
import { BloodrequestMylistComponent } from './models/bloodrequest-mylist/bloodrequest-mylist.component';
import { AdminRequestActiveComponent } from './models/admin-request-active/admin-request-active.component';
import { AdminRequestMylistComponent } from './models/admin-request-mylist/admin-request-mylist.component';
import { SkeletonComponent } from './models/skeleton/skeleton.component';

const models:any[]=[DonationDetailsComponent,DonationHistoryComponent,BloodrequestMylistComponent,AdminRequestActiveComponent,AdminRequestMylistComponent,SkeletonComponent];
const pipes:any[]=[]

@NgModule({
  declarations: [...models,...pipes],
  exports: [...models,...pipes],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
