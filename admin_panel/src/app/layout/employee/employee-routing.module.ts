import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component'

 
const userRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'employee',
    },
    children: [
      {
        path: '',
        redirectTo: 'employee-list',
      },
      {
        path: 'employee-list',
        component:EmployeeListComponent,
        data: {
          title: 'employee List',
        },
      },
      {
        path: 'employee-form',
        component: EmployeeFormComponent,
        data: {
          title: 'employee Form',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
