import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import {SubscriptionListComponent} from './subscription-list/subscription-list.component';
 import {SubscriptionFormComponent} from './subscription-form/subscription-form.component';
 
const userRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'subscription',
    },
    children: [
      {
        path: '',
        redirectTo: 'subscription-list',
      },
      {
        path: 'subscription-list',
        component:SubscriptionListComponent,
        data: {
          title: 'subscription List',
        },
      },
      {
        path: 'subscription-form',
        component: SubscriptionFormComponent,
        data: {
          title: 'subscription Form',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class SubscriptionRoutingModule {}
