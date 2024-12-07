import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
@Pipe({
  name: 'date',
})
export class MedicationDatePipe implements PipeTransform {
  transform(medicationDate: Date) {
    return format(medicationDate, 'MMM dd, HH:mm');
  }
}
