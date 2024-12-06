import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicationTrackingComponent } from './medication-tracking.component';
import { medicalTrackingRoutes } from './medical-tracking.routes';
import { SearchBarModule } from '../../shared/components/search-bar/search-bar.module';
import { MedicationDatePipe } from './pipes/date.pipe';
import { ModalContainerModule } from '../../shared/components/modal-container/modal-container.module';
import { MedicationFormModule } from '../../shared/components/medication-form/medication-form.module';

@NgModule({
  imports: [
    CommonModule,
    medicalTrackingRoutes,
    SearchBarModule,
    ModalContainerModule,
    MedicationFormModule,
  ],
  declarations: [MedicationTrackingComponent, MedicationDatePipe],
})
export class MedicationTrackingModule {
  bindOutsideClickListener() {
    console.log('first');
  }
}
