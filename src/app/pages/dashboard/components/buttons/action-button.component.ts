import { Component, HostBinding } from '@angular/core';

@Component({
  selector: '[action-button]',
  imports: [],
  template: ` <ng-content> </ng-content> `,
  styles: ``,
})
export class ActionButtonComponent {
  @HostBinding('class')
  get buttonClass() {
    return 'rounded bg-light-secondary/30 p-1 text-light-accent dark:bg-dark-secondary/30 dark:text-dark-accent';
  }
}
