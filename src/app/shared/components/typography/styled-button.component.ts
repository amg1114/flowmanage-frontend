import { Component, Input } from '@angular/core';

@Component({
  selector: 'styled-button',
  imports: [],
  template: `
    <button
      [type]="type"
      [class]="
        styleClasses[variant][colorStyle] +
        ' rounded transition-colors duration-300' +
        (variant !== 'ghosted' ? ' py-2 px-4' : '')
      "
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: ``,
})
export class StyledButtonComponent {
  @Input()
  variant: 'outlined' | 'filled' | 'ghosted' = 'filled';

  @Input()
  colorStyle: 'primary' | 'secondary' | 'accent' = 'primary';

  @Input()
  type: 'button' | 'submit' = 'button';

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
      primary: 'd-inline text-light-primary',
      secondary: 'd-inline text-light-secondary dark:text-dark-secondary',
      accent: 'd-inline text-light-accent dark:text-light-accent',
    },
  };
}
