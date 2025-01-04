import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WorkflowStatus } from '@app/core/interfaces/workflows/workflow.interface';
import { CreateWorkflowsService } from '@app/core/services/workflows/create-workflows.service';

import { LucideAngularModule, Plus } from 'lucide-angular';

import { StatusPreviewComponent } from '../../../../components/workflows/status-preview/status-preview.component';

@Component({
  selector: 'app-workflow-status',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LucideAngularModule,
    StatusPreviewComponent,
  ],
  templateUrl: './workflow-status.component.html',
  styles: ``,
})
export class WorkflowStatusComponent {
  readonly CreateIcon = Plus;
  workflowForm!: FormGroup;
  errorMessages: string[] = [];
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

  onDeleteStatus(status: WorkflowStatus): void {
    this.workflowsService.removeStatus(status);
  }
}
