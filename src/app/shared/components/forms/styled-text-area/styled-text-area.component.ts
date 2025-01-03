import { Component, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { CircleCheck, CircleX, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'styled-text-area',
  imports: [LucideAngularModule],
  templateUrl: './styled-text-area.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StyledTextAreaComponent),
      multi: true,
    },
  ],
})
export class StyledTextAreaComponent {
  readonly ErrorIcon = CircleX;
  readonly CheckIcon = CircleCheck;

  @Input() label?: string;
  @Input() placeholder!: string;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() error: string = '';
  @Input() name!: string;
  @Input() id!: string;
  @Input() control?: FormControl | AbstractControl | null;

  value: string = '';
  errorMessages: string[] = [];

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  onInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    if (!this.placeholder) {
      throw new Error('Placeholder for StyledInputComponent is required');
    }

    if (!this.name) {
      throw new Error('Name for StyledInputComponent is required');
    }

    if (!this.id) {
      throw new Error('Id for StyledInputComponent is required');
    }

    if (this.control) {
      this.control.statusChanges.subscribe(() => {
        this.updateErrorMessages();
      });
    }
  }

  private updateErrorMessages() {
    if (!this.control) return;

    this.errorMessages = [];
    const errors = this.control.errors;

    if (errors) {
      if (errors['required']) {
        this.errorMessages.push('This field is required');
      }

      if (errors['minlength']) {
        const requiredLength = errors['minlength'].requiredLength;
        this.errorMessages.push(
          `Minimum length is ${requiredLength} characters`,
        );
      }

      if (errors['maxlength']) {
        const requiredLength = errors['maxlength'].requiredLength;
        this.errorMessages.push(
          `Maximum length is ${requiredLength} characters`,
        );
      }
    }
  }
}
