import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { medicationListResolver } from './features/medication-tracking/resolver/medication-tracker.resolver';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'medication-tracker',
    // implementing lazy loading for faster initial load and better user experience
    loadChildren: () =>
      import('./features/medication-tracking/medication-tracking.module').then(
        (m) => m.MedicationTrackingModule
      ),
    // implement resolver to prefetch data
    resolve: {
      medications: medicationListResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
