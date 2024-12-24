import { Component, Input } from '@angular/core';

@Component({
  selector: 'styled-link',
  imports: [],
  template: `
    <a
      [class]="
        styleClasses[variant][colorStyle] +
        ' cursor-pointer rounded transition-colors duration-300' +
        (variant !== 'ghosted' ? ' px-4 py-2' : '') +
        (class ? ' ' + class : '')
      "
    >
      <ng-content></ng-content>
    </a>
  `,
  styles: ``,
})
export class StyledLinkComponent {
  @Input()
  variant: 'outlined' | 'filled' | 'ghosted' = 'ghosted';

  @Input()
  colorStyle: 'primary' | 'secondary' | 'accent' = 'primary';

  @Input()
  class: string = '';

  readonly styleClasses = {
    filled: {
      primary:
        'text-dark-text bg-light-primary dark:bg-dark-primary hover:bg-transparent hover:text-light-primary dark:hover:text-dark-primary',
      secondary:
        'text-dark-text bg-light-secondary dark:bg-dark-secondary hover:bg-transparent hover:text-light-secondary dark:hover:text-dark-secondary',
      accent:
        'text-dark-text bg-light-accent dark:bg-dark-accent hover:bg-transparent hover:text-light-accent dark:hover:text-dark-accent',
    },

    outlined: {
      primary:
        'border-2 border-light-primary dark:border-dark-primary text-light-primary dark:text-dark-primary hover:bg-light-primary dark:hover:bg-dark-primary hover:text-dark-text',
      secondary:
        'border-2 border-light-secondary dark:border-dark-secondary text-light-secondary dark:text-dark-secondary hover:bg-light-secondary dark:hover:bg-dark-secondary hover:text-dark-text',
      accent:
        'border-2 border-light-accent dark:border-dark-accent text-light-accent dark:text-dark-accent hover:bg-light-accent dark:hover:bg-dark-accent hover:text-dark-text',
    },

    ghosted: {
      primary:
        'd-inline text-light-primary underline hover:text-light-secondary dark:hover:text-dark-secondary',
      secondary:
        'd-inline text-light-secondary dark:text-dark-secondary underline hover:text-light-secondary dark:hover:text-dark-secondary',
      accent:
        'd-inline text-light-accent dark:text-light-accent underline hover:text-light-secondary dark:hover:text-dark-secondary',
    },
  };
}
