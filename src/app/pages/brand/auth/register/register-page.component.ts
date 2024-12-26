import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StyledInputComponent } from '@shared/components/forms/styled-input.component';
import { GoogleIconComponent } from '@shared/components/icons/google-icon.component';
import { StyledButtonComponent } from '@shared/components/typography/styled-button.component';
import { StyledLinkComponent } from '@shared/components/typography/styled-link.component';

@Component({
  selector: 'app-register-page',
  imports: [
    RouterLink,
    StyledButtonComponent,
    StyledLinkComponent,
    StyledInputComponent,
    GoogleIconComponent,
  ],
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {}
