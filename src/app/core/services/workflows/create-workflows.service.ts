import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkflowStatus } from '@app/core/interfaces/workflows/workflow.interface';
import { getRandomResourceColor } from '@app/core/utils/colors';
import {
  statusPlaceHolder,
  requireAllStatusTypesValidator,
  uniqueStatusesValidator,
} from '@app/core/utils/forms/status/create-status';

@Injectable({
  providedIn: 'root',
})
export class CreateWorkflowsService {
  static WORKFLOW_DRAFT_KEY = 'workflow-draft';

  newWorkflow!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  get workflowStatuses(): FormArray {
    return this.newWorkflow.get('status') as FormArray;
  }

  buildForm(): void {
    this.newWorkflow = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(80),
        ],
      ],
      description: ['', [Validators.minLength(10), Validators.maxLength(120)]],
      color: ['', Validators.required],
      status: this.fb.array(
        [],
        [requireAllStatusTypesValidator, uniqueStatusesValidator],
      ),
    });

    this.addDefaultData();
  }

  addDefaultData(): void {
    const draft = localStorage.getItem(
      CreateWorkflowsService.WORKFLOW_DRAFT_KEY,
    );

    if (draft) {
      const parsedDraft = JSON.parse(draft);
      this.newWorkflow.patchValue(parsedDraft);

      return;
    }

    this.newWorkflow.patchValue({ color: getRandomResourceColor() });
    statusPlaceHolder.forEach((status) => this.addStatus(status, false));
  }

  addStatus(status: Partial<WorkflowStatus>, store = true): void {
    this.workflowStatuses.push(
      this.fb.group({
        id: [status.id],
        name: [
          status.name,
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(80),
          ],
        ],
        description: [
          status.description,
          [Validators.minLength(10), Validators.maxLength(120)],
        ],
        type: [status.type, [Validators.required]],
      }),
    );

    this.storeWorkflowDraft();
  }

  removeStatus(status: any): void {
    let statuses = this.workflowStatuses.getRawValue();
    statuses = statuses.filter((s: any) => s.name !== status.name);

    this.workflowStatuses.clear();
    statuses.forEach((s: any) => this.addStatus(s));
  }

  storeWorkflowDraft(): void {
    if (!this.newWorkflow.valid) return;

    localStorage.setItem(
      CreateWorkflowsService.WORKFLOW_DRAFT_KEY,
      JSON.stringify(this.newWorkflow.getRawValue()),
    );
  }

  discardWorkflow(): void {
    localStorage.removeItem(CreateWorkflowsService.WORKFLOW_DRAFT_KEY);

    this.newWorkflow.reset();
    this.workflowStatuses.clear();

    this.buildForm();
  }
}
