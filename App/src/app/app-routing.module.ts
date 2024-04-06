import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'on-boarding',
        loadChildren: () => import('./auth/onboarding/onboarding.module').then(m => m.OnboardingPageModule)
      },
      {
        path: 'change-password',
        loadChildren: () => import('./auth/change-password/change-password.module').then(m => m.ChangePasswordPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./auth/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
      }
 
    ]
  },

  {
    path: 'layout',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutPageModule)

  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
