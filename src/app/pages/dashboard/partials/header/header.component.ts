import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardConfig } from '@app/core/interfaces/dashboard/dashboard-config.interface';
import { LoggedUser } from '@app/core/interfaces/user/user.interface';
import { Workflow } from '@app/core/interfaces/workflows/workflow.interface';
import { DashboardConfigService } from '@app/core/services/dashboard-config.service';

@Component({
  selector: 'dashboard-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  @Input() loggedUser!: LoggedUser;
  @Input() selectedWorkflow: Workflow | null = null;

  constructor(private dashboardConfigService: DashboardConfigService) {
    const selectedWorkflowId =
      this.dashboardConfigService.getSelectedWorkflow();

    if (selectedWorkflowId) {
      this.selectedWorkflow =
        this.loggedUser.workflows.at(selectedWorkflowId)?.workflow || null;
    }
  }
}
