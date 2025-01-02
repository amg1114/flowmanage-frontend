import { Component } from '@angular/core';
import { ActionButtonComponent } from './action-button.component';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  selector: 'board-action-create',
  imports: [ActionButtonComponent, LucideAngularModule],
  template: `<button type="button" action-button>
    <lucide-angular [img]="CreateIcon" size="18"></lucide-angular>
  </button>`,
  styles: ``,
})
export class ActionCreateComponent {
  readonly CreateIcon = Plus;
}
