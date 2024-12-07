import { AbstractControl, ValidationErrors } from '@angular/forms';

export function uniqueHoursValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (control instanceof Array || control instanceof Object) {
    const values = control.value as string[];
    const uniqueValues = new Set(values);
    return values.length !== uniqueValues.size
      ? { duplicateHours: true }
      : null;
  }
  return null;
}
