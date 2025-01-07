import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkflowStatus } from '@app/core/interfaces/workflows/workflow.interface';
import { getRandomResourceColor } from '@app/core/utils/colors';
import {
  statusPlaceHolder,
  requireAllStatusTypesValidator,
  uniqueStatusesValidator,
} from '@app/core/utils/forms/status/create-status';
import { BehaviorSubject, map, Observable, throwError, catchError } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class CreateWorkflowsService {
  static WORKFLOW_DRAFT_KEY = 'workflow-draft';

  newWorkflow!: FormGroup;

  private creating = new BehaviorSubject<boolean>(false);
  creating$ = this.creating.asObservable();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.buildForm();
  }

  get workflowStatuses(): FormArray {
    return this.newWorkflow.get('statuses') as FormArray;
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
      statuses: this.fb.array(
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

      const statuses = parsedDraft.status || [];
      this.workflowStatuses.clear();
      statuses.forEach((status: Partial<WorkflowStatus>) =>
        this.addStatus(status, false),
      );
      return;
    }

    this.newWorkflow.patchValue({ color: getRandomResourceColor() });
    statusPlaceHolder.forEach((status) => this.addStatus(status, false));
  }

  addStatus(status: Partial<WorkflowStatus>, store = true): void {
    this.workflowStatuses.push(
      this.fb.group({
        name: [
          status.name,
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(80),
          ],
        ],
        description: [
          status.description ?? '',
          [Validators.minLength(10), Validators.maxLength(120)],
        ],
        type: [status.type, [Validators.required]],
      }),
    );

    if (store) {
      this.storeWorkflowDraft();
    }
  }

  removeStatus(status: any): void {
    const index = this.workflowStatuses
      .getRawValue()
      .findIndex((s: Partial<WorkflowStatus>) => s.name === status.name);

    this.workflowStatuses.removeAt(index);
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

  saveWorkflow(): Observable<any> {
    if (!this.newWorkflow.valid) {
      throw new Error('Form is invalid');
    }

    const workflow = this.newWorkflow.getRawValue();

    this.creating.next(true);

    return this.http.post('/api/workflows/create', workflow).pipe(
      map((res) => {
        localStorage.removeItem(CreateWorkflowsService.WORKFLOW_DRAFT_KEY);
        this.authService.fetchUser().subscribe();
        this.creating.next(false);
        return res;
      }),
      catchError((error) => {
        this.creating.next(false);
        this.storeWorkflowDraft();
        return throwError(() => error);
      }),
    );
  }
}
