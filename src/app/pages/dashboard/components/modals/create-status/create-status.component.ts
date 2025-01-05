import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { WorkflowStatusType } from '@app/core/utils/status';
import { StyledInputComponent } from '@app/shared/components/forms/styled-input/styled-input.component';
import { StyledTextAreaComponent } from '@app/shared/components/forms/styled-text-area/styled-text-area.component';
import { StyledButtonComponent } from '@app/shared/components/typography/styled-button.component';

@Component({
  selector: 'board-modal-create-status',
  imports: [
    ReactiveFormsModule,
    StyledButtonComponent,
    StyledInputComponent,
    StyledTextAreaComponent,
  ],
  templateUrl: './create-status.component.html',
  styles: ``,
})
export class CreateStatusComponent implements OnInit {
  @Input() type: WorkflowStatusType = WorkflowStatusType.INACTIVE;
  @Input() open: boolean = false;

  statusType = signal(WorkflowStatusType.INACTIVE);

  @Output()
  onClose: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  onCreate = new EventEmitter();

  statusForm!: FormGroup;

  readonly statusBadgeColors: Record<WorkflowStatusType, string> = {
    [WorkflowStatusType.ACTIVE]: 'bg-secondary dark:bg-secondary-dark',
    [WorkflowStatusType.INACTIVE]: 'bg-placeholder dark:bg-placeholder-dark',
    [WorkflowStatusType.COMPLETED]: 'bg-accent dark:bg-accent-dark',
  };

  constructor(private fb: FormBuilder) {
    this.statusForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      description: ['', [Validators.minLength(3), Validators.maxLength(255)]],
      type: [this.type, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.statusForm.invalid) return;
    this.statusForm.get('type')?.setValue(this.type);

    this.onCreate.emit(this.statusForm.value);
    this.statusForm.reset();
  }

  onDiscard(): void {
    this.onClose.emit();
    this.statusForm.reset();
  }

  ngOnInit(): void {}
}
