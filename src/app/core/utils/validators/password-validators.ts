import { Validators } from '@angular/forms';

export const PasswordValidator = Validators.compose([
  Validators.required,
  Validators.minLength(8),
  Validators.pattern(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&^])[A-Za-z\d@$!%*?&^]{8,}$/,
  ),
]);
