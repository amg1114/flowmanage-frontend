import { UserRoles } from '@app/core/utils/constants/user-roles.constants';
import { Workflow } from '../workflows/workflow.interface';

export interface LoggedUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  workflows: UserWorkflows[];
}

export interface UserWorkflows {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  role: UserRoles;
  workflow: Workflow;
}
