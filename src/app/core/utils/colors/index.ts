import { ResourceColors } from '../constants/resource-colors.constants';

export function getRandomResourceColor(): ResourceColors {
  const colors = Object.values(ResourceColors);
  return colors[Math.floor(Math.random() * colors.length)];
}
