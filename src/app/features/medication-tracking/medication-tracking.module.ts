import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicationTrackingComponent } from './medication-tracking.component';
import { medicalTrackingRoutes } from './medical-tracking.routes';
import { SearchBarModule } from '../../shared/components/search-bar/search-bar.module';
import { MedicationDatePipe } from './pipes/date.pipe';
import { MedicationModalModule } from '../../shared/components/medication-modal/medication-modal.module';
import { FrequencyPipe } from './pipes/frequency.pipe';

@NgModule({
  imports: [
    CommonModule,
    medicalTrackingRoutes,
    SearchBarModule,
    MedicationModalModule,
  ],
  declarations: [
    MedicationTrackingComponent,
    MedicationDatePipe,
    FrequencyPipe,
  ],
})
export class MedicationTrackingModule {
  bindOutsideClickListener() {
    console.log('first');
  }
}
