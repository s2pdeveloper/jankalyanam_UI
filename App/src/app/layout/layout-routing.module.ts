import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPage } from './layout.page';

const routes: Routes = [
  
    // {
    // path: '',
    // // component: LayoutPage,
    // redirectTo:'layout',
    // pathMatch: 'full'
    // },
    {
      path:'',
      children:[
        {
          path: 'menu',
          loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
        },
        {
          path: 'home',
          loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
        },
        {
          path: '',
          redirectTo: 'menu',
          pathMatch: 'full',
        },
      ]
    },

    
  
   
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPageRoutingModule {}
