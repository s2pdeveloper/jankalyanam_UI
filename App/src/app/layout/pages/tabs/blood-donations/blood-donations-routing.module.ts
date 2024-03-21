import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BloodDonationsPage } from './blood-donations.page';

const routes: Routes = [
  {
    path: '',
    component: BloodDonationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BloodDonationsPageRoutingModule {}
