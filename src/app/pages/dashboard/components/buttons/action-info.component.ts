import { Component } from '@angular/core';
import { ActionButtonComponent } from './action-button.component';
import { LucideAngularModule, Info } from 'lucide-angular';

@Component({
  selector: 'board-action-info',
  imports: [ActionButtonComponent, LucideAngularModule],
  template: `<button type="button" action-button>
    <lucide-angular [img]="Icon" size="18"></lucide-angular>
  </button>`,
  styles: ``,
})
export class ActionInfoComponent {
  readonly Icon = Info;
}
