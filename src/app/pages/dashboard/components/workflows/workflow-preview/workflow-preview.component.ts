import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Workflow } from '@app/core/interfaces/workflows/workflow.interface';
import {
  resourceColorBgClasses,
  resourceColorBorderClasses,
} from '@app/core/utils/constants/resource-colors.constants';
import { UserRoles } from '@app/core/utils/constants/user-roles.constants';
import { LucideAngularModule, Workflow as WorkflowIcon } from 'lucide-angular';

@Component({
  selector: 'board-workflow-preview',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './workflow-preview.component.html',
})
export class WorkflowPreviewComponent {
  readonly WorkflowIcon = WorkflowIcon;

  readonly resourceBg = resourceColorBgClasses;
  readonly resourceBorder = resourceColorBorderClasses;

  @Input() workflow!: Workflow;
  @Input() userRole!: UserRoles | string;
  @Input() preview = false;

  cardClassList =
    'relative flex h-full w-full flex-wrap items-start gap-4 rounded border-l-4 p-4 transition-colors';
  // thumbColorClass = resourceColorBgClasses[this.workflow.color];

  constructor() {}
}
