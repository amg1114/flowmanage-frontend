import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/brand/brand.routes').then((m) => m.routes),
  },
];
