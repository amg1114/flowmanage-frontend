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
      class="fill-light-accent dark:fill-dark-accent"
    ></lucide-angular>
  </button>`,
  styles: ``,
})
export class ActionFilterComponent {
  readonly FilterIcon = Filter;
}
