import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { DonateFormComponent } from './donate-form/donate-form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Donate',
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
          title: 'Donate List',
        },
      },
      {
        path: 'donate-form',
        component: DonateFormComponent,
        data: {
          title: 'Donate List',
        },
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DonateRoutingModule {}
