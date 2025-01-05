import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WorkflowStatus } from '@app/core/interfaces/workflows/workflow.interface';
import { CreateWorkflowsService } from '@app/core/services/workflows/create-workflows.service';

import { LucideAngularModule, Plus } from 'lucide-angular';

import { StatusPreviewComponent } from '../../../../components/workflows/status-preview/status-preview.component';
import { CreateStatusComponent } from '../../../../components/modals/create-status/create-status.component';
import { WorkflowStatusType } from '@app/core/utils/status';

@Component({
  selector: 'app-workflow-status',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LucideAngularModule,
    StatusPreviewComponent,
    CreateStatusComponent,
  ],
  templateUrl: './workflow-status.component.html',
  styles: ``,
})
export class WorkflowStatusComponent {
  readonly CreateIcon = Plus;
  readonly WorkflowStatusType = WorkflowStatusType;

  readonly createStatusButtons = [
    {
      label: 'Pending State',
      type: WorkflowStatusType.INACTIVE,
      class:
        'bg-placeholder/30 hover:bg-placeholder dark:bg-placeholder-dark/30 dark:hover:bg-placeholder-dark',
    },
    {
      label: 'Active State',
      type: WorkflowStatusType.ACTIVE,
      class:
        'bg-secondary/30 hover:bg-secondary dark:bg-secondary-dark/30 dark:hover:bg-secondary-dark',
    },
    {
      label: 'Completed State',
      type: WorkflowStatusType.COMPLETED,
      class:
        'bg-accent/30 hover:bg-accent dark:bg-accent-dark/30 dark:hover:bg-accent-dark',
    },
  ];

  workflowForm!: FormGroup;
  errorMessages: string[] = [];

  createNewStatusType: WorkflowStatusType | null = null;

  constructor(private workflowsService: CreateWorkflowsService) {
    this.workflowForm = this.workflowsService.newWorkflow;

    this.workflowForm.get('status')?.statusChanges.subscribe(() => {
      this.errorMessages = [];
      const errors = (this.workflowForm.get('status') as FormArray)?.errors;
      if (!errors) return;

      if (errors['duplicateStatuses']) {
        this.errorMessages.push('Statuses must have unique names');
      }

      if (errors['requireAllStatusTypes']) {
        this.errorMessages.push(
          'You must have at least one status of each type: Active, Inactive, Completed',
        );
      }
    });
  }

  get statuses(): WorkflowStatus[] {
    return this.workflowForm.get('status')?.getRawValue() as WorkflowStatus[];
  }

  showCreateStatusModal(type: WorkflowStatusType): void {
    this.createNewStatusType = type;
  }

  hideStatusModal(): void {
    this.createNewStatusType = null;
  }

  onCreateStatus(status: Partial<WorkflowStatus>): void {
    this.createNewStatusType = null;
    this.workflowsService.addStatus(status);
  }

  onDeleteStatus(status: WorkflowStatus): void {
    this.workflowsService.removeStatus(status);
  }
}
