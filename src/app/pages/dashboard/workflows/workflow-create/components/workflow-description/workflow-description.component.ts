import { Component } from '@angular/core';
import { StyledInputComponent } from '../../../../../../shared/components/forms/styled-input/styled-input.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateWorkflowsService } from '@app/core/services/workflows/create-workflows.service';
import { StyledTextAreaComponent } from '@app/shared/components/forms/styled-text-area/styled-text-area.component';
import { ColorPickerComponent } from '../../../../../../shared/components/forms/color-picker/color-picker.component';
import { StyledButtonComponent } from '@app/shared/components/typography/styled-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workflow-description',
  imports: [
    StyledInputComponent,
    StyledTextAreaComponent,
    ReactiveFormsModule,
    ColorPickerComponent,
    StyledButtonComponent,
  ],
  templateUrl: './workflow-description.component.html',
  styles: ``,
})
export class WorkflowDescriptionComponent {
  workflowForm!: FormGroup;
  constructor(
    private readonly workflowsService: CreateWorkflowsService,
    private readonly router: Router,
  ) {
    this.workflowForm = this.workflowsService.newWorkflow;
  }

  onSubmit() {
    if (this.formValid) {
      this.workflowsService.storeWorkflowDraft();
      this.router.navigate(['/dashboard/workflows/create/status']);
    }
  }

  onReset() {
    this.workflowsService.discardWorkflow();
    this.router.navigate(['/dashboard/workflows']);
  }

  get formValid() {
    return (
      this.workflowForm.get('title')?.valid &&
      this.workflowForm.get('description')?.valid
    );
  }
}
