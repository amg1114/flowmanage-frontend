import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class WorkflowsService {
  constructor() {}

  newWorkflow: FormGroup = new FormGroup({
    title: new FormControl('Workflow Title', [Validators.required]),
    description: new FormControl('Workflow Description', [Validators.required]),
  });
}
