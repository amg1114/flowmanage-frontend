import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { PasswordValidator } from '@app/core/utils/validators/password-validators';
import { StyledInputComponent } from '@shared/components/forms/styled-input.component';
import { StyledButtonComponent } from '@shared/components/typography/styled-button.component';
import { StyledLinkComponent } from '@shared/components/typography/styled-link.component';
import { Loader, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    LucideAngularModule,
    RouterLink,
    StyledButtonComponent,
    StyledLinkComponent,
    StyledInputComponent,
  ],
  providers: [AuthService],
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {
  readonly LoadIcon = Loader;

  isLoading = false;
  registerForm!: FormGroup;
  message: { type: 'success' | 'error'; text: string } | null = null;
  constructor(private authService: AuthService) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', PasswordValidator),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, firstName, lastName } = this.registerForm.value;
      this.isLoading = true;
      this.authService
        .register({ email, password, firstName, lastName })
        .subscribe({
          next: (response) => {
            this.message = {
              type: 'success',
              text: 'Registration successful!',
            };
            this.isLoading = false;
          },
          error: (error) => {
            this.message = {
              type: 'error',
              text: error.error.message,
            };
            this.isLoading = false;
          },
        });
    }
  }
}
