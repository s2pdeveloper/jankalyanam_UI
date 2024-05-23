import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailForOtpPage } from './email-for-otp.page';

const routes: Routes = [
  {
    path: '',
    component: EmailForOtpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailForOtpPageRoutingModule {}
