import { Component, Input } from '@angular/core';
import { LucideAngularModule, Loader, CircleCheckBig, X } from 'lucide-angular';

@Component({
  selector: 'modal-form-feedback',
  imports: [LucideAngularModule],
  templateUrl: './form-feedback.component.html',
  styles: ``,
})
export class ModalFormFeedbackComponent {
  readonly LoaderIcon = Loader;
  readonly SuccessIcon = CircleCheckBig;
  readonly ErrorIcon = X;

  @Input() success = false;
  @Input() error = false;
  @Input() loading = false;
  @Input() link: { text: string; url: string } | null = null;

  @Input() message = '';
  constructor() {}
}
