import { Component } from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Workflow } from '@app/core/interfaces/workflows/workflow.interface';
import {
  LucideAngularModule,
  Plus,
  SquareDashedKanban,
  Workflow as WorkflowIcon,
} from 'lucide-angular';
import { WorkflowCardComponent } from '../../components/workflows/workflow-card.component';
import { StyledInputComponent } from '../../../../shared/components/forms/styled-input/styled-input.component';
import { ResourceColors } from '@app/core/utils/constants/resource-colors.constants';
import { StyledTextAreaComponent } from '../../../../shared/components/forms/styled-text-area/styled-text-area.component';
import { CommonModule } from '@angular/common';
import { ColorPickerComponent } from '../../../../shared/components/forms/color-picker/color-picker.component';
import { getRandomResourceColor } from '@app/core/utils/colors';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { WorkflowsService } from '@app/core/services/workflows/workflows.service';

@Component({
  selector: 'board-workflow-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    RouterLink,
    RouterLinkActive,
    WorkflowCardComponent,
    RouterOutlet,
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
    {
      path: '#',
      label: 'Create',
      icon: Plus,
    },
  ];

  workflowForm!: FormGroup;

  constructor(private workflowsService: WorkflowsService) {
    this.workflowForm = workflowsService.newWorkflow;
  }

  get workflow() {
    return this.workflowForm.getRawValue() as Workflow;
  }
}
