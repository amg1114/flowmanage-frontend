import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: '[styled-button]',
  imports: [],
  template: ` <ng-content></ng-content> `,
  styles: ``,
})
export class StyledButtonComponent {
  @Input() variant: 'outlined' | 'filled' | 'ghosted' = 'filled';
  @Input() colorStyle: 'primary' | 'secondary' | 'accent' | 'text' = 'primary';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() class: string = '';
  @Input() control?: FormControl | AbstractControl | null;

  readonly styleClasses = {
    filled: {
      primary:
        'text-charcoal-dark bg-primary dark:bg-primary-dark hover:bg-transparent hover:text-primary dark:hover:text-primary-dark',
      secondary:
        'text-charcoal-dark bg-secondary dark:bg-secondary-dark hover:bg-transparent hover:text-secondary dark:hover:text-secondary-dark',
      accent:
        'text-charcoal-dark bg-accent dark:bg-accent-dark hover:bg-transparent hover:text-accent dark:hover:text-accent-dark',
      text: 'text-charcoal-dark bg-charcoal dark:bg-charcoal-dark dark:text-charcoal hover:bg-transparent hover:text-charcoal dark:hover:text-charcoal-dark',
    },

    outlined: {
      primary:
        'border-2 border-primary dark:border-primary-dark text-primary dark:text-primary-dark hover:bg-primary dark:hover:bg-primary-dark hover:text-charcoal-dark',
      secondary:
        'border-2 border-secondary dark:border-secondary-dark text-secondary dark:text-secondary-dark hover:bg-secondary dark:hover:bg-secondary-dark hover:text-charcoal-dark',
      accent:
        'border-2 border-accent dark:border-accent-dark text-accent dark:text-accent-dark hover:bg-accent dark:hover:bg-accent-dark hover:text-charcoal-dark',
      text: 'border-2 border-charcoal dark:border-charcoal-dark text-charcoal dark:text-charcoal-dark hover:bg-charcoal dark:hover:bg-charcoal-dark hover:text-charcoal-dark dark:hover:text-text',
    },

    ghosted: {
      primary: 'd-inline text-primary',
      secondary: 'd-inline text-secondary dark:text-secondary-dark',
      accent: 'd-inline text-accent dark:text-accent',
      text: 'd-inline text-charcoal dark:text-text',
    },
  };

  @HostBinding('attr.type')
  get buttonType() {
    return this.type;
  }

  @HostBinding('class')
  get buttonClass() {
    return (
      this.styleClasses[this.variant][this.colorStyle] +
      ' rounded transition-colors duration-300 disabled:pointer-events-none' +
      (this.variant !== 'ghosted' ? ' px-4 py-2' : '') +
      (this.class ? ' ' + this.class : '')
    );
  }
}
