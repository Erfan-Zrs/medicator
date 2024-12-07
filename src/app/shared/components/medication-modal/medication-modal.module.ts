import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicationModalComponent } from './medication-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MedicationModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[MedicationModalComponent]
})
export class MedicationModalModule { }
