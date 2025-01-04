import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Workflow } from '@app/core/interfaces/workflows/workflow.interface';
import {
  LucideAngularModule,
  SquareDashedKanban,
  Workflow as WorkflowIcon,
} from 'lucide-angular';

import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CreateWorkflowsService } from '@app/core/services/workflows/create-workflows.service';
import { WorkflowPreviewComponent } from '../../components/workflows/workflow-preview/workflow-preview.component';

@Component({
  selector: 'board-workflow-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    WorkflowPreviewComponent,
  ],
  templateUrl: './workflow-create.component.html',
})
export class WorkflowCreateComponent {
  readonly routes = [
    {
      path: 'description',
      label: 'Description',
      icon: WorkflowIcon,
    },
    {
      path: 'status',
      label: 'Status',
      icon: SquareDashedKanban,
    },
  ];

  workflowForm!: FormGroup;

  constructor(private workflowsService: CreateWorkflowsService) {
    this.workflowForm = this.workflowsService.newWorkflow;
  }

  get workflow() {
    return this.workflowForm.getRawValue() as Workflow;
  }
}
