import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@pages/brand/brand.routes').then((m) => m.routes),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@pages/dashboard/dashboard.routes').then((m) => m.routes),
  },
];
