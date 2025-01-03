import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WorkflowsService } from '@app/core/services/workflows/workflows.service';
import { ColorPickerComponent } from '@app/shared/components/forms/color-picker/color-picker.component';
import { StyledInputComponent } from '@app/shared/components/forms/styled-input/styled-input.component';
import { StyledTextAreaComponent } from '@app/shared/components/forms/styled-text-area/styled-text-area.component';
import { StyledButtonComponent } from '@app/shared/components/typography/styled-button.component';

@Component({
  selector: 'app-workflow-status',
  imports: [
    StyledInputComponent,
    StyledTextAreaComponent,
    ReactiveFormsModule,
    ColorPickerComponent,
    StyledButtonComponent,
  ],
  templateUrl: './workflow-status.component.html',
  styles: ``,
})
export class WorkflowStatusComponent {
  workflowForm!: FormGroup;

  constructor(private workflowsService: WorkflowsService) {
    this.workflowForm = this.workflowsService.newWorkflow;
  }
}
