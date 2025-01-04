import { WorkflowStatus } from '@app/core/interfaces/workflows/workflow.interface';
import { WorkflowStatusType } from '../../status';

export const statusPlaceHolder: Partial<WorkflowStatus>[] = [
  {
    name: 'Pending',
    description: 'This status is pending',
    type: WorkflowStatusType.INACTIVE,
  },
  {
    name: 'Active',
    description: 'This status is active',
    type: WorkflowStatusType.ACTIVE,
  },
  {
    name: 'Completed',
    description: 'This status is completed',
    type: WorkflowStatusType.COMPLETED,
  },
];
