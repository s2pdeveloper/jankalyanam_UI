import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestMylistDetailPage } from './request-mylist-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RequestMylistDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestMylistDetailPageRoutingModule {}
