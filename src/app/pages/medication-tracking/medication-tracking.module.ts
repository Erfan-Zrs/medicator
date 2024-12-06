import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicationTrackingComponent } from './medication-tracking.component';
import { medicalTrackingRoutes } from './medical-tracking.routes';
import { SearchBarModule } from '../../shared/components/search-bar/search-bar.module';

@NgModule({
  imports: [CommonModule, medicalTrackingRoutes, SearchBarModule],
  declarations: [MedicationTrackingComponent],
})
export class MedicationTrackingModule {
  bindOutsideClickListener() {
    console.log('first');
  }
}
