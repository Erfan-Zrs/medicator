import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MedicationList } from '../../models/medication-list';

@Injectable({
  providedIn: 'root',
})
export class medicationTrackerService {
  private medicationList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  constructor() {
    const storedData = localStorage.getItem('medicationList');
    const parsedData = storedData ? JSON.parse(storedData) : [];
    this.medicationList$.next(parsedData);
  }

  getMedicationList(): Observable<MedicationList[]> {
    return this.medicationList$.asObservable();
  }
  addMedication(newMedication: MedicationList): void {
    const currentList = this.medicationList$.value;
    const updatedList = [...currentList, newMedication];
    this.setLocalStorage(updatedList);
  }
  deleteMedication(id: string): void {
    const currentList = this.medicationList$.value;
    const index = currentList.findIndex((item) => {
      return item.id === id;
    });
    if (index !== -1) {
      currentList.splice(index, 1);
      this.setLocalStorage(currentList);
    }
  }
  updateMedication(medication: MedicationList) {
    const currentList = this.medicationList$.value;
    const index = currentList.findIndex((item) => {
      return item.id === medication.id;
    });
    if (index !== -1) {
      currentList[index] = medication;
      this.setLocalStorage(currentList);
    }
  }
  private setLocalStorage(updatedList: any[]): void {
    localStorage.setItem('medicationList', JSON.stringify(updatedList));
    this.medicationList$.next(updatedList);
  }
}
