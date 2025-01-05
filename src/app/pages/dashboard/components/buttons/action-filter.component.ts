import { Component } from '@angular/core';
import { ActionButtonComponent } from './action-button.component';
import { LucideAngularModule, Filter } from 'lucide-angular';

@Component({
  selector: 'board-action-filter',
  imports: [ActionButtonComponent, LucideAngularModule],
  template: `<button type="button" action-button>
    <lucide-angular
      [img]="FilterIcon"
      size="18"
      class="fill-accent dark:fill-accent-dark"
    ></lucide-angular>
  </button>`,
})
export class ActionFilterComponent {
  readonly FilterIcon = Filter;
}
