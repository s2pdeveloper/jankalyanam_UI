import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page1Component } from './page1/page1.component';
import { Routes, RouterModule } from '@angular/router';

const userRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'PDF',
    },
    children: [
      {
        path: '',
        redirectTo: 'pdf',
      },
      {
        path: 'pdf',
        component: Page1Component,
        data: {
          title: 'PDF',
        },
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class PuppeteerRoutingModule { }
