import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  maxLengthArray,
  minLengthArray,
} from '../../utils/form-array-validator';

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
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder) {}
  medicationForm: FormGroup = this.formBuilder.group({
    medicationName: ['', [Validators.required, Validators.minLength(3)]],
    dosage: ['', [Validators.required]],
    unit: ['', [Validators.required]],
    selectedDays: this.formBuilder.array([], minLengthArray(1)),
    selectedHours: this.formBuilder.array(
      [],
      [minLengthArray(1), maxLengthArray(5)]
    ),
  });
  addHour(): void {
    this.selectedHours.push(this.formBuilder.control('00:00'));
  }
  ngOnInit(): void {
    this.addHour();
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
  }

  removeHour(index: number): void {
    this.selectedHours.removeAt(index);
  }
  onClose(): void {
    this.close.emit();
    this.medicationForm.reset();
    this.selectedDays.clear();
    this.selectedHours.clear();
  }

  onSubmit(): void {
    this.medicationForm.markAllAsTouched();
    if (this.medicationForm.valid) {
      this.submit.emit(this.medicationForm.value);
      this.onClose();
    }
  }
}
