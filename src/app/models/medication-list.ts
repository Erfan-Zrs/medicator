export interface MedicationList {
  medicationName: string;
  dosage: number;
  unit: string;
  selectedDays: string[];
  selectedHours: string[];
  lastUpdate: Date;
  id?: string;
}
