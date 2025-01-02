import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Workflow } from '@app/core/interfaces/workflows/workflow.interface';
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
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './workflow-card.component.html',
  styles: ``,
})
export class WorkflowCardComponent {
  readonly WorkflowIcon = WorkflowIcon;
  readonly UsersIcon = Users;
  readonly TasksIcon = CheckSquare;
  readonly ProjectsIcon = FolderCog;
  readonly MenuICon = Ellipsis;

  @Input() workflow!: Workflow;
  @Input() userRole!: UserRoles | string;

  constructor() {}
}
