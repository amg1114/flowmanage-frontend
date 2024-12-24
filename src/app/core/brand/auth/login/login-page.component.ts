import { Component } from '@angular/core';
import { StyledButtonComponent } from '../../../../shared/components/typography/styled-button.component';
import { StyledLinkComponent } from '../../../../shared/components/typography/styled-link.component';
import { RouterLink } from '@angular/router';
import { StyledInputComponent } from '../../../../shared/components/forms/styled-input.component';

@Component({
  selector: 'app-login-page',
  imports: [
    RouterLink,
    StyledButtonComponent,
    StyledLinkComponent,
    StyledInputComponent,
  ],
  templateUrl: './login-page.component.html',
  styles: ``,
})
export class LoginPageComponent {}
