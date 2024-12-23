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
    ],
  },
];
