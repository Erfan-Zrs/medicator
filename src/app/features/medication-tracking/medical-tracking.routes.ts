import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicationTrackingComponent } from './medication-tracking.component';

const routes: Routes = [
  {
    path: '',
    component: MedicationTrackingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class medicalTrackingRoutes {}
