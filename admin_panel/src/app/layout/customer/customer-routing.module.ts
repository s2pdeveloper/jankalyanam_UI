import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';

const userRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'customer',
    },
    children: [
      {
        path: '',
        redirectTo: 'customer-list',
      },
      {
        path: 'customer-list',
        component: CustomerListComponent,
        data: {
          title: 'customer List',
        },
      },
      {
        path: 'customer-form',
        component: CustomerFormComponent,
        data: {
          title: 'customer Form',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
