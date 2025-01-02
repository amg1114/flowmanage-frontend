import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Workflow } from '@app/core/interfaces/workflows/workflow.interface';
import {
  resourceColorBgClasses,
  resourceColorBorderClasses,
} from '@app/core/utils/constants/resource-colors.constants';
import { UserRoles } from '@app/core/utils/constants/user-roles.constants';
import {
  LucideAngularModule,
  Workflow as WorkflowIcon,
  Users,
  CheckSquare,
  FolderCog,
  Ellipsis,
} from 'lucide-angular';

@Component({
  selector: 'board-workflow-card',
  imports: [LucideAngularModule, RouterLink, CommonModule],
  templateUrl: './workflow-card.component.html',
  styles: ``,
})
export class WorkflowCardComponent {
  readonly WorkflowIcon = WorkflowIcon;
  readonly UsersIcon = Users;
  readonly TasksIcon = CheckSquare;
  readonly ProjectsIcon = FolderCog;
  readonly MenuICon = Ellipsis;

  readonly resourceBg = resourceColorBgClasses;
  readonly resourceBorder = resourceColorBorderClasses;

  @Input() workflow!: Workflow;
  @Input() userRole!: UserRoles | string;

  cardClassList =
    'relative flex h-full w-full flex-wrap items-start gap-4 rounded border-l-4 p-4 transition-colors';
  // thumbColorClass = resourceColorBgClasses[this.workflow.color];

  constructor() {}
}
