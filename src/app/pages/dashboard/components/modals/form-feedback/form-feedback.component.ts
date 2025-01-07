import { Component, Input, WritableSignal } from '@angular/core';
import { ModalFeedback } from '@app/core/interfaces/ui/modals';
import { LucideAngularModule, Loader, CircleCheckBig, X } from 'lucide-angular';

@Component({
  selector: 'modal-form-feedback',
  imports: [LucideAngularModule],
  templateUrl: './form-feedback.component.html',
})
export class ModalFormFeedbackComponent {
  readonly modalIcons = {
    success: {
      icon: CircleCheckBig,
      class: 'text-accent dark:text-accent-dark',
    },
    error: { icon: X, class: 'text-error dark:text-error-dark' },
    loading: { icon: Loader, class: 'text-secondary dark:text-secondary-dark' },
  };

  @Input() data!: WritableSignal<ModalFeedback>;

  constructor() {}
}
