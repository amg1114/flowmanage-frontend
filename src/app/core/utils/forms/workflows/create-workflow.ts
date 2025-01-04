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
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(80),
      ]),
      description: new FormControl('', [
        Validators.minLength(10),
        Validators.maxLength(120),
      ]),
      type: new FormControl('', [Validators.required]),
    }),
  ]),
});
