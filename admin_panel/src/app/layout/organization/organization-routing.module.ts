import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationFormComponent } from './organization-form/organization-form.component';
import { OrganizationListComponent } from './organization-list/organization-list.component';

const userRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'organization',
    },
    children: [
      {
        path: '',
        redirectTo: 'organization-list',
      },
      {
        path: 'organization-list',
        component: OrganizationListComponent,
        data: {
          title: 'organization List',
        },
      },
      {
        path: 'organization-form',
        component: OrganizationFormComponent,
        data: {
          title: 'organization Form',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
