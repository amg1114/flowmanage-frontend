import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { DashboardConfigService } from '../services/dashboard-config.service';
import { AuthService } from '../services/auth.service';

export const workflowSelectionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UsersService);
  const authService = inject(AuthService);
  const dashboardConfigService = inject(DashboardConfigService);

  if (state.url !== '/dashboard') {
    return of(true);
  }

  return userService.loggedUser.pipe(
    switchMap((user) => {
      if (!user) {
        return authService.getUserData();
      }
      return of(user);
    }),

    map((user) => {
      if (!user) {
        router.navigate(['/login']);
        return false;
      }

      if (!user.workflows.length) {
        router.navigate(['/dashboard/workflows']);
        return false;
      }

      const selectedWorkflow = dashboardConfigService.getSelectedWorkflow();
      if (selectedWorkflow === null) {
        router.navigate(['/dashboard/workflows']);
        return false;
      }

      return true;
    }),
  );
};
