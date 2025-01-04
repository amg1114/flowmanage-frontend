import { WorkflowStatus } from '@app/core/interfaces/workflows/workflow.interface';
import { WorkflowStatusType } from '../../status';
import { ValidationErrors, ValidatorFn } from '@angular/forms';

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

export const uniqueStatusesValidator: ValidatorFn = (
  control,
): ValidationErrors | null => {
  if (!control || !control.value || !Array.isArray(control.value)) {
    return null;
  }

  const statuses = control.value as WorkflowStatus[];

  const statusNames = statuses.map((status) => status.name);

  const uniqueNames = new Set(statusNames);

  if (uniqueNames.size !== statusNames.length) {
    return { duplicateStatuses: true };
  }

  return null;
};

export const requireAllStatusTypesValidator: ValidatorFn = (
  control,
): ValidationErrors | null => {
  if (!control || !control.value || !Array.isArray(control.value)) {
    return null;
  }

  const statuses = control.value as WorkflowStatus[];

  const activeStatuses = statuses.filter(
    (status) => status.type === WorkflowStatusType.ACTIVE,
  );
  const completedStatuses = statuses.filter(
    (status) => status.type === WorkflowStatusType.COMPLETED,
  );
  const inactiveStatuses = statuses.filter(
    (status) => status.type === WorkflowStatusType.INACTIVE,
  );

  if (
    activeStatuses.length === 0 ||
    completedStatuses.length === 0 ||
    inactiveStatuses.length === 0
  ) {
    return { requireAllStatusTypes: true };
  }

  return null;
};
