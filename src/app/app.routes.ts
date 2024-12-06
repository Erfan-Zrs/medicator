import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'medication-tracker',
    // implementing lazy loading for faster initial load and better user experience
    loadChildren: () =>
      import('./pages/medication-tracking/medication-tracking.module').then(
        (m) => m.MedicationTrackingModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
