import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MedicationList } from '../../models/medication-list';

@Injectable({
  providedIn: 'root',
})
export class medicationTrackerService {
  tableData: MedicationList[] = [
    {
      medicationName: 'Aspirin',
      dosage: '500mg',
      frequency: 'Daily',
      lastUpdate: new Date(),
    },
    {
      medicationName: 'Ibuprofen',
      dosage: '200mg',
      frequency: 'Every 8 hours',
      lastUpdate: new Date(),
    },
    {
      medicationName: 'Paracetamol',
      dosage: '1000mg',
      frequency: 'Every 4 hours',
      lastUpdate: new Date(),
    },
  ];
  private medicationList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  constructor() {
    const storedData = localStorage.getItem('medicationList');
    const parsedData = storedData ? JSON.parse(storedData) : [];
    // this.medicationList$.next(parsedData);
    this.medicationList$.next(this.tableData);
  }

  getMedicationList(): Observable<any[]> {
    return this.medicationList$.asObservable();
  }
  addMedication(newMedication: any): void {
    const currentList = this.medicationList$.value;
    const updatedList = [...currentList, newMedication];
    this.setLocalStorage(updatedList);
  }
  deleteMedication(index: number): void {
    const currentList = [...this.medicationList$.value];
    currentList.splice(index, 1);
    this.setLocalStorage(currentList);
  }
  private setLocalStorage(updatedList: any[]): void {
    localStorage.setItem('medicationList', JSON.stringify(updatedList));
    this.medicationList$.next(updatedList);
  }
}
