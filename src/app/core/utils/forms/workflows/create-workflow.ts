import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { getRandomResourceColor } from '../../colors';
import { WorkflowStatusType } from '../../status';

export const workflowPlaceHolder = new FormGroup({
  title: new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(80),
  ]),
  description: new FormControl('', [
    Validators.minLength(10),
    Validators.maxLength(120),
  ]),
  color: new FormControl(getRandomResourceColor(), [Validators.required]),
  status: new FormArray([
    new FormGroup({
      name: new FormControl('Pending', [Validators.required]),
      description: new FormControl('Pending Tasks', [Validators.required]),
      type: new FormControl(WorkflowStatusType.INACTIVE, [Validators.required]),
    }),
    new FormGroup({
      name: new FormControl('In Progress', [Validators.required]),
      description: new FormControl('In progress tasks', [Validators.required]),
      type: new FormControl(WorkflowStatusType.ACTIVE, [Validators.required]),
    }),
    new FormGroup({
      name: new FormControl('Completed', [Validators.required]),
      description: new FormControl('Completed Tasks', [Validators.required]),
      type: new FormControl(WorkflowStatusType.COMPLETED, [
        Validators.required,
      ]),
    }),
  ]),
});
