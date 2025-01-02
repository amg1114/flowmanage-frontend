import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: '[styled-link]',
  template: ` <ng-content></ng-content> `,
  styles: [],
})
export class StyledLinkComponent {
  @Input()
  variant: 'outlined' | 'filled' | 'ghosted' = 'ghosted';

  @Input()
  colorStyle: 'primary' | 'secondary' | 'accent' = 'primary';

  @Input()
  class: string = '';

  @HostBinding('class')
  get linkClass(): string {
    return (
      this.styleClasses[this.variant][this.colorStyle] +
      ' cursor-pointer rounded transition-colors duration-300' +
      (this.variant !== 'ghosted' ? ' px-4 py-2' : '') +
      (this.class ? ' ' + this.class : '')
    );
  }

  readonly styleClasses = {
    filled: {
      primary:
        'text-charcoal-dark bg-primary dark:bg-primary-dark hover:bg-transparent hover:text-primary dark:hover:text-primary-dark',
      secondary:
        'text-charcoal-dark bg-secondary dark:bg-secondary-dark hover:bg-transparent hover:text-secondary dark:hover:text-secondary-dark',
      accent:
        'text-charcoal-dark bg-accent dark:bg-accent-dark hover:bg-transparent hover:text-accent dark:hover:text-accent-dark',
    },

    outlined: {
      primary:
        'border-2 border-primary dark:border-primary-dark text-primary dark:text-primary-dark hover:bg-primary dark:hover:bg-primary-dark hover:text-charcoal-dark',
      secondary:
        'border-2 border-secondary dark:border-secondary-dark text-secondary dark:text-secondary-dark hover:bg-secondary dark:hover:bg-secondary-dark hover:text-charcoal-dark',
      accent:
        'border-2 border-accent dark:border-accent-dark text-accent dark:text-accent-dark hover:bg-accent dark:hover:bg-accent-dark hover:text-charcoal-dark',
    },

    ghosted: {
      primary:
        'd-inline text-primary underline hover:text-secondary dark:hover:text-secondary-dark',
      secondary:
        'd-inline text-secondary dark:text-secondary-dark underline hover:text-secondary dark:hover:text-secondary-dark',
      accent:
        'd-inline text-accent dark:text-accent underline hover:text-secondary dark:hover:text-secondary-dark',
    },
  };
}
