import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WorkflowStatus } from '@app/core/interfaces/workflows/workflow.interface';
import { CreateWorkflowsService } from '@app/core/services/workflows/create-workflows.service';

import { LucideAngularModule, Plus } from 'lucide-angular';

import { StatusPreviewComponent } from '../../../../components/workflows/status-preview/status-preview.component';
import { CreateStatusComponent } from '../../../../components/modals/create-status/create-status.component';
import { WorkflowStatusType } from '@app/core/utils/status';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { StyledButtonComponent } from '@app/shared/components/typography/styled-button.component';
import { Router, RouterLink } from '@angular/router';
import { ModalFormFeedbackComponent } from '@app/pages/dashboard/components/modals/form-feedback/form-feedback.component';
import { finalize } from 'rxjs';
import { ModalFeedback } from '@app/core/interfaces/ui/modals';

@Component({
  selector: 'app-workflow-status',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    DragDropModule,
    RouterLink,
    StatusPreviewComponent,
    CreateStatusComponent,
    StyledButtonComponent,
    ModalFormFeedbackComponent,
  ],
  templateUrl: './workflow-status.component.html',
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

  modalFeedback = signal<ModalFeedback>({
    show: false,
    type: 'loading',
    message: '',
  });

  constructor(
    private workflowsService: CreateWorkflowsService,
    private router: Router,
  ) {
    this.workflowForm = this.workflowsService.newWorkflow;

    this.statusFormArray.statusChanges.subscribe(() => {
      this.errorMessages = [];
      const errors = this.statusFormArray.errors;

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

  get statusFormArray(): FormArray<FormGroup> {
    return this.workflowForm.get('statuses') as FormArray;
  }

  get statuses(): WorkflowStatus[] {
    return this.statusFormArray.getRawValue() as WorkflowStatus[];
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

  onSubmit(): void {
    this.modalFeedback.update((o) => ({
      show: true,
      type: 'loading',
      message: 'Saving workflow...',
    }));

    this.workflowsService.saveWorkflow().subscribe({
      next: () => {
        this.modalFeedback.update((o) => ({
          show: true,
          type: 'success',
          message: 'Workflow saved successfully!',
        }));

        setTimeout(() => {
          this.modalFeedback.update((o) => ({ ...o, show: false }));
          this.router.navigate(['/dashboard/workflows']);
        }, 1200);
      },
      error: (error) => {
        console.error(error);

        this.modalFeedback.update((o) => ({
          show: true,
          type: 'error',
          message:
            error.error.message || 'An error occurred. Please try again.',
        }));

        setTimeout(() => {
          this.modalFeedback.update((o) => ({ ...o, show: false }));
        }, 1200);
      },
    });
  }

  onDiscard(): void {
    this.workflowsService.discardWorkflow();
    this.router.navigate(['/dashboard/workflows']);
  }

  drop(event: CdkDragDrop<FormGroup[]>): void {
    moveItemInArray(
      this.statusFormArray.controls,
      event.previousIndex,
      event.currentIndex,
    );

    const itemsValue = this.statusFormArray.value;

    moveItemInArray(itemsValue, event.previousIndex, event.currentIndex);

    this.statusFormArray.patchValue(itemsValue);
    this.workflowsService.storeWorkflowDraft();
  }
}
