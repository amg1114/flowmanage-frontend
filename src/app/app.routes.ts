import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/home/home-page.component').then(
        (m) => m.HomePageComponent,
      ),
  },
];
