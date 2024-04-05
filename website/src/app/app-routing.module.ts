import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'' , redirectTo:'home',pathMatch:'full'

  },
  { path: 'home', loadChildren: () => import('./features/landing-layout/landing-layout.module').then(m => m.LandingLayoutModule) },
  { path: 'privacy', loadChildren: () => import('./features/privacy/privacy.module').then(m => m.PrivacyModule) },
  { path: 'terms', loadChildren: () => import('./features/terms-conditions/terms-conditions.module').then(m => m.TermsConditionsModule) },
  { path: 'donate', loadChildren: () => import('./features/donateblood/donateblood-routing.module').then(m => m.DonatebloodRoutingModule) },
  { path: 'request', loadChildren: () => import('./features/requestblood/requestblood-routing.module').then(m => m.RequestbloodRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
