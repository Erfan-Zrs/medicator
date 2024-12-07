import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'frequencyPipe',
})
export class FrequencyPipe implements PipeTransform {
  transform(selectedDays: string[], selectedHours: string[]): string {
    if (selectedDays.length === 7) {
      return `Every day at ${selectedHours.join(', ')}`;
    } else {
      return `${selectedDays.join(', ')} at ${selectedHours.join(', ')}`;
    }
  }
}
