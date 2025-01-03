import { ResourceColors } from '@app/core/utils/constants/resource-colors.constants';
import { WorkflowStatusType } from '@app/core/utils/status';

export interface Workflow {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  slug: string;
  description: null | string;
  color: ResourceColors;
  status: WorkflowStatus[];
}

export interface WorkflowStatus {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  type: WorkflowStatusType;
  isDefault: boolean;
  order: number;
}
