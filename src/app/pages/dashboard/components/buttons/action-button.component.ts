import { Component, HostBinding } from '@angular/core';

@Component({
  selector: '[action-button]',
  imports: [],
  template: ` <ng-content> </ng-content> `,
})
export class ActionButtonComponent {
  @HostBinding('class')
  get buttonClass() {
    return 'rounded bg-secondary/30 p-1 text-accent dark:bg-secondary-dark/30 dark:text-accent-dark hover:bg-secondary/60 transition-colors dark:hover:bg-secondary-dark/60 ';
  }
}
