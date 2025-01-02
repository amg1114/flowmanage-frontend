import { ResourceColors } from '@app/core/utils/constants/resource-colors.constants';

export interface Workflow {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: null | string;
  color: ResourceColors;
}
