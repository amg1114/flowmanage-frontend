import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoggedUser,
  UserWorkflows,
} from '@app/core/interfaces/user/user.interface';
import { Workflow } from '@app/core/interfaces/workflows/workflow.interface';
import { DashboardConfigService } from '@app/core/services/dashboard-config.service';
import { UsersService } from '@app/core/services/users.service';

@Component({
  selector: 'app-workflow-detail',
  imports: [],
  templateUrl: './workflow-detail.component.html',
})
export class WorkflowDetailComponent {
  loggedUser: LoggedUser | null = null;
  workflow: Workflow | null = null;
  constructor(
    private usersService: UsersService,
    private boardConfig: DashboardConfigService,
    private router: Router,
  ) {
    const slug = this.router.url.split('/').pop();
    const selectedWorkflow = this.boardConfig.getSelectedWorkflow();

    this.usersService.loggedUser.subscribe((user) => {
      this.loggedUser = user;

      if (user) {
        const workflowIndex = user.workflows.findIndex(
          (uW) => uW.workflow.slug === slug,
        );

        const userWorkflow = user.workflows[workflowIndex];

        if (!userWorkflow) {
          this.router.navigate(['/dashboard']);
        }

        if (workflowIndex !== selectedWorkflow) {
          this.boardConfig.setSelectedWorkflow(workflowIndex);
        }

        this.workflow = userWorkflow.workflow;
      }
    });
  }
}
