import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { EnuiryComponent } from './enuiry/enuiry.component';
import { CollaborateComponent } from './collaborate/collaborate.component';

const userRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Users',
    },
    children: [
      {
        path: '',
        redirectTo: 'users',
      },
      {
        path: 'users',
        component: UserListComponent,
        data: {
          title: 'Users List',
        },
      },
      {
        path: 'users-form',
        component: UserFormComponent,
        data: {
          title: 'Users Form',
        },
      },
      {
        path: 'enquiry-table',
        component: EnuiryComponent,
        data: {
          title: 'Enquiry',
        },
      },
      {
        path: 'collaborate-table',
        component: CollaborateComponent,
        data: {
          title: 'Collaborate',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
