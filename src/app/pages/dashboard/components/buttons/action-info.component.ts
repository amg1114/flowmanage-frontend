import { Component } from '@angular/core';
import { ActionButtonComponent } from './action-button.component';
import { LucideAngularModule, Info } from 'lucide-angular';

@Component({
  selector: 'board-action-info',
  imports: [ActionButtonComponent, LucideAngularModule],
  template: `<button
    type="button"
    action-button
    class="group relative !flex cursor-help justify-center"
  >
    <lucide-angular [img]="Icon" size="18"></lucide-angular>
    <div
      class="bg-accent-canvas dark:bg-accent-canvas-dark absolute top-full mt-4 min-w-52 rounded p-2 text-xs text-accent opacity-0 transition-opacity group-hover:z-20 group-hover:opacity-100 dark:text-accent-dark"
    >
      <ng-content></ng-content>
    </div>
  </button>`,
  styles: ``,
})
export class ActionInfoComponent {
  readonly Icon = Info;
}
