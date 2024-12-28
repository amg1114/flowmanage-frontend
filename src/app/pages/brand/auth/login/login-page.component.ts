import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
import { AuthService } from '@app/core/services/auth.service';
import { LucideAngularModule, Loader } from 'lucide-angular';
import { PasswordValidator } from '@app/core/utils/validators/password-validators';
@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    LucideAngularModule,
    RouterLink,
    StyledButtonComponent,
    StyledLinkComponent,
    StyledInputComponent,
    GoogleIconComponent,
  ],
  providers: [AuthService, Router],
  templateUrl: './login-page.component.html',
  standalone: true,
})
export class LoginPageComponent {
  readonly LoadIcon = Loader;

  isLoading = false;
  loginForm!: FormGroup;
  message: { type: 'success' | 'error'; text: string } | null = null;

  constructor(
    private authService: AuthService,
    //private router: Router,
  ) {
    //if (authService.isAuthenticated()) {
    //this.router.navigate(['/']);
    //}

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', PasswordValidator),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.isLoading = true;
      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          this.message = {
            type: 'success',
            text: 'Login successful!',
          };
          this.isLoading = false;
          setTimeout(() => {
            this.message = null;
            //this.router.navigate(['/']);
          }, 2000);
        },
        error: (error) => {
          this.message = {
            type: 'error',
            text: error.error.message,
          };
          console.error(error);
          this.isLoading = false;
        },
      });
    }
  }
}
