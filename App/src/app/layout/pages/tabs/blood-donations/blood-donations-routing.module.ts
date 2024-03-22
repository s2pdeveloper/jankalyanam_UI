import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{DonationDetailsComponent} from '../../../../shared/models/donation-details/donation-details.component'
import { BloodDonationsPage } from './blood-donations.page';

const routes: Routes = [
  {
    path: '',
    component: BloodDonationsPage
  },
  {
    path: 'donation-details',
    component: DonationDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BloodDonationsPageRoutingModule {}
