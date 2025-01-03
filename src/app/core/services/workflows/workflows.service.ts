import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { workflowPlaceHolder } from '@app/core/utils/forms/workflows/create-workflow';

@Injectable({
  providedIn: 'root',
})
export class WorkflowsService {
  static WORKFLOW_DRAFT_KEY = 'workflow-draft';

  newWorkflow: FormGroup = workflowPlaceHolder;

  constructor() {
    const draft = localStorage.getItem(WorkflowsService.WORKFLOW_DRAFT_KEY);
    if (draft) {
      this.newWorkflow.patchValue(JSON.parse(draft));
    }
  }

  storeWorkflowDraft(): void {
    this.newWorkflow.markAllAsTouched();
    localStorage.setItem(
      WorkflowsService.WORKFLOW_DRAFT_KEY,
      JSON.stringify(this.newWorkflow.getRawValue()),
    );
  }

  discardWorkflow(): void {
    this.newWorkflow.reset();
    localStorage.removeItem(WorkflowsService.WORKFLOW_DRAFT_KEY);
  }
}
