import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StyledButtonComponent } from '@shared/components/typography/styled-button.component';
import { StyledLinkComponent } from '@shared/components/typography/styled-link.component';
import { StyledInputComponent } from '@shared/components/forms/styled-input.component';
import { GoogleIconComponent } from '@shared/components/icons/google-icon.component';

@Component({
  selector: 'app-login-page',
  imports: [
    RouterLink,
    StyledButtonComponent,
    StyledLinkComponent,
    StyledInputComponent,
    GoogleIconComponent,
  ],
  templateUrl: './login-page.component.html',
  styles: ``,
})
export class LoginPageComponent {}
