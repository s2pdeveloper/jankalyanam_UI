import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPage } from './layout.page';

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'menu',
        loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
      },

    ]
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/onboarding/onboarding.module').then(m => m.OnboardingPageModule)
  },
  {
    path: 'request',
    loadChildren: () => import('./pages/request/request.module').then( m => m.RequestPageModule)
  },
  {
    path: 'donate',
    loadChildren: () => import('./pages/donate/donate.module').then( m => m.DonatePageModule)
  },  {
    path: 'blood-donations',
    loadChildren: () => import('./pages/tabs/blood-donations/blood-donations.module').then( m => m.BloodDonationsPageModule)
  },
  {
    path: 'blood-requests',
    loadChildren: () => import('./pages/tabs/blood-requests/blood-requests.module').then( m => m.BloodRequestsPageModule)
  }













];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPageRoutingModule { }
