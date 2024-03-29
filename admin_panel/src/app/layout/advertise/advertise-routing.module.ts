import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Advertise',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: ListComponent,
        data: {
          title: 'Advertise List',
        },
      },
      {
        path: 'form',
        component: FormComponent,
        data: {
          title: 'Advertise Form',
        },
      },
    ],
  },
];


@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdvertiseRoutingModule { }
