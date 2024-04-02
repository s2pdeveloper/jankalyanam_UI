import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Attender',
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
          title: 'Attender List',
        },
      },
      {
        path: 'form',
        component: FormComponent,
        data: {
          title: 'Attender Form',
        },
      },
      
    ],
  },
];


@NgModule({ 
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttenderRoutingModule { }
