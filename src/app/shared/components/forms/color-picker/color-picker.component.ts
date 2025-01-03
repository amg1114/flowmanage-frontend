import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { getRandomResourceColor } from '@app/core/utils/colors';
import {
  resourceColorBgClasses,
  ResourceColors,
} from '@app/core/utils/constants/resource-colors.constants';
import { Check, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'color-picker',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './color-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true,
    },
  ],
})
export class ColorPickerComponent implements OnInit {
  readonly CheckIcon = Check;
  readonly colors = Object.values(ResourceColors);
  readonly bgColors = resourceColorBgClasses;

  @Input() control?: FormControl | AbstractControl | null;

  value: ResourceColors = getRandomResourceColor();
  errorMessages: string[] = [];

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  selectOption(value: ResourceColors): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  ngOnInit(): void {
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

      if (errors['email']) {
        this.errorMessages.push('Invalid email format');
      }

      if (errors['pattern']) {
        this.errorMessages.push(
          'Must contain at least one letter, one number, one special character',
        );
      }
    }
  }
}
