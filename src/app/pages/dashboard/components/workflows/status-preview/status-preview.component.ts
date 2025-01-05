import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WorkflowStatus } from '@app/core/interfaces/workflows/workflow.interface';
import { WorkflowStatusType } from '@app/core/utils/status';
import {
  LucideAngularModule,
  Plus,
  Trash2,
  GripVertical,
  Clock,
  CheckSquare,
  Bolt,
} from 'lucide-angular';

@Component({
  selector: 'board-status-preview',
  imports: [LucideAngularModule, DragDropModule, ReactiveFormsModule],
  templateUrl: './status-preview.component.html',
  styles: ``,
})
export class StatusPreviewComponent {
  readonly DeleteIcon = Trash2;
  readonly DragIcon = GripVertical;

  @Input() statusForm!: FormGroup;

  @Output('deletedStatus')
  deleted = new EventEmitter<WorkflowStatus>();

  readonly statusBackground: Record<WorkflowStatusType, string> = {
    [WorkflowStatusType.INACTIVE]:
      'bg-placeholder/30 dark:bg-placeholder-dark/30',
    [WorkflowStatusType.ACTIVE]: 'bg-secondary/30 dark:bg-secondary-dark/30',
    [WorkflowStatusType.COMPLETED]: 'bg-accent/30 dark:bg-accent-dark/30',
  };

  readonly statusIcons: Record<WorkflowStatusType, any> = {
    [WorkflowStatusType.INACTIVE]: Clock,
    [WorkflowStatusType.ACTIVE]: Bolt,
    [WorkflowStatusType.COMPLETED]: CheckSquare,
  };

  constructor() {}

  get status(): WorkflowStatus {
    return this.statusForm.value as WorkflowStatus;
  }

  onDeleted(): void {
    this.deleted.emit(this.status);
  }
}
