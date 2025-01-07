import { Routes } from '@angular/router';
import { DashboardLayout } from './dashboard.layout';
import { authGuard } from '@app/core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayout,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'workflows',
        loadComponent: () =>
          import(
            './workflows/workflow-listing/workflow-listing.component'
          ).then((m) => m.WorkflowListingComponent),
      },
      {
        path: 'workflows/create',
        loadComponent: () =>
          import('./workflows/workflow-create/workflow-create.component').then(
            (m) => m.WorkflowCreateComponent,
          ),
        children: [
          {
            path: 'description',
            loadComponent: () =>
              import(
                '@pages/dashboard/workflows/workflow-create/components/workflow-description/workflow-description.component'
              ).then((m) => m.WorkflowDescriptionComponent),
          },
          {
            path: 'status',
            loadComponent: () =>
              import(
                '@pages/dashboard/workflows/workflow-create/components/workflow-status/workflow-status.component'
              ).then((m) => m.WorkflowStatusComponent),
          },
          { path: '**', redirectTo: 'description' },
        ],
      },
      {
        path: ':slug',
        loadComponent: () =>
          import('./workflows/workflow-detail/workflow-detail.component').then(
            (m) => m.WorkflowDetailComponent,
          ),
      },
    ],
  },
];
