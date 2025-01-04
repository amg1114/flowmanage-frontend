import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  constructor(private workflowsService: CreateWorkflowsService) {
    this.workflowForm = this.workflowsService.newWorkflow;
  }

  get statuses(): WorkflowStatus[] {
    return this.workflowForm.get('status')?.getRawValue() as WorkflowStatus[];
  }

  onDeleteStatus(status: WorkflowStatus): void {
    this.workflowsService.removeStatus(status);
  }
}
