import { Routes } from '@angular/router';
import { DashboardLayout } from './dashboard.layout';
import { authGuard } from '@app/core/guards/auth.guard';
import { workflowSelectionGuard } from '@app/core/guards/workflow-selection.guard';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayout,
    canActivate: [authGuard, workflowSelectionGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'workflows',
        loadComponent: () =>
          import('./workflows/workflows.component').then(
            (m) => m.WorkflowsComponent,
          ),
      },
      {
        path: ':slug',
        loadComponent: () =>
          import('./workflows/workflows.component').then(
            (m) => m.WorkflowsComponent,
          ),
      },
    ],
  },
];
