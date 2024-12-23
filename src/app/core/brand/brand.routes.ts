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
    ],
  },
];
