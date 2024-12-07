import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  maxLengthArray,
  minLengthArray,
} from '../../utils/form-array-validator';
import { MedicationList } from '../../../models/medication-list';
import { uniqueHoursValidator } from '../../utils/uniqe-hour-validator';

@Component({
  selector: 'app-medication-modal',
  templateUrl: './medication-modal.component.html',
  styleUrl: './medication-modal.component.css',
})
export class MedicationModalComponent {
  weekDays = [
    { name: 'Mon', value: 'monday' },
    { name: 'Tue', value: 'tuesday' },
    { name: 'Wed', value: 'wednesday' },
    { name: 'Thu', value: 'thursday' },
    { name: 'Fri', value: 'friday' },
    { name: 'Sat', value: 'saturday' },
    { name: 'Sun', value: 'sunday' },
  ];
  @Input() isVisible: boolean = false;
  @Input() data!: MedicationList | null;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder) {}
  medicationForm: FormGroup = this.formBuilder.group({
    medicationName: ['', [Validators.required, Validators.minLength(3)]],
    dosage: ['', [Validators.required]],
    unit: ['', [Validators.required]],
    selectedDays: this.formBuilder.array([], minLengthArray(1)),
    selectedHours: this.formBuilder.array(
      [],
      [minLengthArray(1), maxLengthArray(5), uniqueHoursValidator]
    ),
    id: [''],
  });
  addHour(): void {
    this.selectedHours.push(this.formBuilder.control('00:00'));
    this.medicationForm.get('selectedHours')?.markAsTouched();
  }
  ngOnInit(): void {
    if (this.data) {
      this.setFormValues(this.data);
    } else {
      this.addHour();
    }
  }
  setFormValues(data: MedicationList) {
    this.medicationForm.patchValue({
      medicationName: data.medicationName,
      dosage: data.dosage,
      unit: data.unit,
      id: data.id,
    });
    const selectedDaysArray = this.medicationForm.get(
      'selectedDays'
    ) as FormArray;
    selectedDaysArray.clear();
    data.selectedDays.forEach((day: string) => {
      selectedDaysArray.push(this.formBuilder.control(day));
    });

    const selectedHoursArray = this.medicationForm.get(
      'selectedHours'
    ) as FormArray;
    selectedHoursArray.clear();
    data.selectedHours.forEach((hour: string) => {
      selectedHoursArray.push(this.formBuilder.control(hour));
    });
  }
  get selectedDays(): FormArray {
    return this.medicationForm.get('selectedDays') as FormArray;
  }
  get selectedHours(): FormArray {
    return this.medicationForm.get('selectedHours') as FormArray;
  }

  toggleDay(day: string): void {
    const index = this.selectedDays.controls.findIndex(
      (control) => control.value === day
    );

    if (index === -1) {
      this.selectedDays.push(this.formBuilder.control(day));
    } else {
      this.selectedDays.removeAt(index);
    }
    this.medicationForm.get('selectedDays')?.markAsTouched();
  }

  removeHour(index: number): void {
    this.medicationForm.get('selectedHours')?.markAsTouched();
    this.selectedHours.removeAt(index);
  }
  onClose() {
    this.close.emit();
    this.medicationForm.reset();
    this.selectedDays.clear();
    this.selectedHours.clear();
  }

  onSubmit() {
    this.medicationForm.markAllAsTouched();
    if (this.medicationForm.valid) {
      this.submit.emit(this.medicationForm.value);
      this.onClose();
    }
  }

  onDelete() {
    this.delete.emit(this.medicationForm.value.id);
    this.onClose();
  }
}
