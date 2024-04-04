import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { BloodRequestFormComponent } from './blood-request-form/blood-request-form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Blood Request',
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
          title: 'Blood Request List',
        },
      },
      {
        path: 'blood-request-form',
        component: BloodRequestFormComponent,
        data: {
          title: 'Blood Request List',
        },
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class BloodRequestRoutingModule {}
