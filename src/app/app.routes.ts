import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@pages/brand/brand.routes').then((m) => m.routes),
  },
];
