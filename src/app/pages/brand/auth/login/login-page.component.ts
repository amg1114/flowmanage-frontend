import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StyledButtonComponent } from '@shared/components/typography/styled-button.component';
import { StyledLinkComponent } from '@shared/components/typography/styled-link.component';
import { StyledInputComponent } from '@shared/components/forms/styled-input.component';
import { GoogleIconComponent } from '@shared/components/icons/google-icon.component';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    StyledButtonComponent,
    StyledLinkComponent,
    StyledInputComponent,
    GoogleIconComponent,
  ],
  templateUrl: './login-page.component.html',
  styles: ``,
  standalone: true,
})
export class LoginPageComponent {
  loginForm!: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        ),
      ]),
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }
}
