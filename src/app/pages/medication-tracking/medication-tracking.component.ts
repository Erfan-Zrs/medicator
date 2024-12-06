import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medication-tracking',
  templateUrl: './medication-tracking.component.html',
  styleUrls: ['./medication-tracking.component.css'],
})
export class MedicationTrackingComponent implements OnInit {
  tableData = [
    {
      medicationName: 'Aspirin',
      dosage: '500mg',
      frequency: 'Daily',
      lastUpdate: '2023-12-01',
    },
    {
      medicationName: 'Ibuprofen',
      dosage: '200mg',
      frequency: 'Every 8 hours',
      lastUpdate: '2023-12-02',
    },
    {
      medicationName: 'Paracetamol',
      dosage: '1000mg',
      frequency: 'Every 4 hours',
      lastUpdate: '2023-12-03',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
