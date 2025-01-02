import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { authGuard } from '@app/core/guards/auth.guard';
import { workflowSelectionGuard } from '@app/core/guards/workflow-selection.guard';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
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
    ],
  },
];
