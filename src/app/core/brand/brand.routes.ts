import { Routes } from '@angular/router';
import { BrandComponent } from './brand.component';

export const routes: Routes = [
  {
    path: '',
    component: BrandComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home/home-page.component').then((m) => m.HomePageComponent),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./about/about-page.component').then(
            (m) => m.AboutPageComponent,
          ),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./contact/contact-page.component').then(
            (m) => m.ContactPageComponent,
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/login/login-page.component').then(
            (m) => m.LoginPageComponent,
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./auth/register/register-page.component').then(
            (m) => m.RegisterPageComponent,
          ),
      },
    ],
  },
];
