import { inject } from '@angular/core';
import { medicationTrackerService } from '../../../shared/services/medication-tracker.service';
import { Observable } from 'rxjs';

export const medicationListResolver = (): Observable<any[]> => {
  const service = inject(medicationTrackerService);
  return service.getMedicationList();
};
