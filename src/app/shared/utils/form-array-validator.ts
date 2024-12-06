import { AbstractControl } from '@angular/forms';

export function minLengthArray(min: number) {
  return (control: AbstractControl) => {
    if (control.value.length >= min) {
      return null;
    }
    return {
      minLengthArray: {
        requiredLength: min,
        actualLength: control.value.length,
      },
    };
  };
}

export function maxLengthArray(max: number) {
  return (control: AbstractControl) => {
    if (control.value.length <= max) {
      return null;
    }
    return {
      maxLengthArray: {
        requiredLength: max,
        actualLength: control.value.length,
      },
    };
  };
}
